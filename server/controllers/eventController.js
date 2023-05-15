const Event = require('../models/Events');

const createEvent = async (req, res) => {
    try {
        const { eventText, eventTime, notes } = req.body;
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { eventText, eventTime, notes },
            { new: true }
        );
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add the event' });
    }
};

const getEvents = async (req, res) => {
    try {
        const event = await Event.find();
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: 'error, failed to get events' })
    }
};

//Add getEventById?

const updateEvent = async (req, res) => {
    try {
        const { eventText, eventTime, notes } = req.body;
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { eventText, eventTime, notes },
            { new: true }
        );
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        res.status(500).json({ error: 'Sorry, failed to update' });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' })
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the event' });
    }
};

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent,
};