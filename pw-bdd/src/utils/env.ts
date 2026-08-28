export default class ENV {
    public static readonly BASE_URL = process.env.BASE_URL || 'https://automationexercise.com';
    public static readonly MOCK_API = process.env.MOCK_API === 'true';
}
