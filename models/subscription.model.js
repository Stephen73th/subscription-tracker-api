import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: [2, 'Subscription name must be at least 2 characters long'],
        maxLength: [100, 'Subscription name must be at most 100 characters long']
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Subscription price must be at least 0']
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD'],
        default: 'USD'
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['entertainment', 'news', 'sports', 'lifestyle', 'tech', 'finance', 'education', 'politics', 'other'],
        required: [true, 'Subscription category is required']
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'canceled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: [true, 'Subscription start date is required'],
        validate: {
            validator: function(value) {
                if (!value) return false;
                return value <= new Date();
            },
            message: 'Start date cannot be in the future'
        },
    },
     renewalDate: {
        type: Date,
        required: [true, 'Subscription start date is required'],
        validate: {
            validator: function(value) {
        
                return value > this.startDate;
            },
            message: 'Renewal date must be after Start date  '
        },
    },
    user: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
}, {
    timestamps: true
});

//Auto calculate renewal date if missing
subscriptionSchema.pre('save', function(next) { 
    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }


    //Auto update the status if the renewal date has passed
    if (this.renewalDate < new Date()) {
        this.status = 'expired'
    }
    next();
});


// export default mongoose.model('Subscription', subscriptionSchema);