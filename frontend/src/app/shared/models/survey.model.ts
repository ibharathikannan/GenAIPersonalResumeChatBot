export class SurveyModel {
    bookingId: number;
    bookingRefNo: string
    // 1. How did you hear about the SES Booking System Program?
    informationSource: {
        // InformationSourceTypes
        type: number,
        comment: string
    };
    // 2. How do you rate the SES Booking System program?
    rates: {
        // ProgramRate
        bookingProcess: number,
        experience: number,
        trialDuration: number,
        customerService: number,
        introductionTraining: number
    };
    // 3. Which product(s) would you consider buying?
        // ConsiderBuying
    deviceRecommend: boolean;
    // 4. Could you advise some possible reasons?
    advise: {
        // Advise
        type: Array<number>,
        comment: string
    };
    // 5. Was the SES Booking System effective  in the following areas?
    effective: {
        // Effective
        acquainted: number,
        influenced: number,
    };
    // 6. Would you recommend the SES Booking System to your friends and families?
    recommend: boolean
};

export const InformationSourceTypes = [
    {
        id: 1,
        order: 1,
        text: 'Heard from my family/friends'
    },
    {
        id: 2,
        order: 2,
        text: 'Social media'
    },
    {
        id: 3,
        order: 3,
        text: 'In Samsung Experience Stores'
    },
    {
        id: 4,
        order: 4,
        text: 'Email from Samsung'
    },
    {
        id: 5,
        order: 5,
        text: 'Push notifications from Samsung'
    },
    {
        id: 20,
        order: 20,
        text: 'Others'
    }
];
export const ProgramRate = [
    {
        id: 1,
        text: 'Very Poor'
    },
    {
        id: 2,
        text: 'Poor'
    },
    {
        id: 3,
        text: 'Average'
    },
    {
        id: 4,
        text: 'Good'
    },
    {
        id: 5,
        text: 'Excellent'
    },
];
export const ConsiderBuying = [
    {
        id: 1,
        order: 1,
        text: 'Galaxy Z Fold2 5G'
    },
    {
        id: 2,
        order: 2,
        text: 'Galaxy Z Flip 5G'
    },
    {
        id: 20,
        order: 20,
        text: 'None of the above'
    }
];
export const Advise = [
    {
        id: 1,
        order: 1,
        text: 'Price point'
    },
    {
        id: 2,
        order: 2,
        text: 'User experience (OS & UI)'
    },
    {
        id: 3,
        order: 3,
        text: 'Design'
    },
    {
        id: 4,
        order: 4,
        text: 'Concerns on durability'
    },
    {
        id: 5,
        order: 5,
        text: 'Camera'
    },
    {
        id: 6,
        order: 6,
        text: 'Battery life'
    },
    {
        id: 7,
        order: 7,
        text: 'Internal storage capacity'
    },
    {
        id: 8,
        order: 8,
        text: 'No attractive promotions'
    },
    {
        id: 20,
        order: 20,
        text: 'Others'
    },
];
export const Effective = [
    {
        // No effective at all
        id: 1,
        text: '1'
    },
    {
        id: 2,
        text: '2'
    },
    {
        id: 3,
        text: '3'
    },
    {
        id: 4,
        text: '4'
    },
    {
        // Very effective
        id: 5,
        text: '5'
    },
]

