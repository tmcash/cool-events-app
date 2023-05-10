const Event = require('../models/Events');
const User = require('../models/User')

const resolvers = {
    Query: {
        events: async () => {
            return await Event.find();
        },
        user: async (parent, { email }) => {
            return User.findOne({ email }).populate('events');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('events');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // notes: async (parent, { username }) => {
        //     const params = email ? { email } : {};
        //     return Event.find(params).sort({ createdAt: -1 });
        // },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        addEvent: async (parent, { eventText }, context) => {
            if (context.user) {
                const event = await Event.create({
                    eventText,
                    eventAuthor: context.user.email,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { events: event._id } }
                );

                return event;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // addComment: async (parent, { thoughtId, commentText }, context) => {
        //     if (context.user) {
        //         return Event.findOneAndUpdate(
        //             { _id: EventId },
        //             // {
        //             //     $addToSet: {
        //             //         notes: { noteText, noteAuthor: context.user.email },
        //             //     },
        //             // },
        //             {
        //                 new: true,
        //                 runValidators: true,
        //             }
        //         );
        //     }
        //     throw new AuthenticationError('You need to be logged in!');
        // },
        removeEvent: async (parent, { eventId }, context) => {
            if (context.user) {
                const event = await Event.findOneAndDelete({
                    _id: eventId,
                    eventAuthor: context.user.email,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { events: event._id } }
                );

                return event;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeNote: async (parent, { eventId, noteId }, context) => {
            if (context.user) {
                return Event.findOneAndUpdate(
                    { _id: eventId },
                    {
                        $pull: {
                            note: {
                                _id: noteId,
                            },
                        },
                    },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;

