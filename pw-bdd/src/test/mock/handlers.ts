import { http, HttpResponse } from 'msw';
import { Response } from 'cross-fetch';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const handlers = [
  http.post('http://127.0.0.1:9090/booking', async ({ request }) => {
    const data = await request.json() as any;
    return HttpResponse.json({
      bookingid: Math.floor(Math.random() * 1000),
      booking: data
    }, { status: 200 });
  }),

  http.get('http://127.0.0.1:9090/simulate-500', async () => {
    await delay(500);
    return HttpResponse.json({
        error: "Internal Server Error",
        message: "Simulated fatal error for demonstration."
    }, { status: 500 });
  }),

  http.post('http://127.0.0.1:9090/rest/api/2/issue', async ({ request }) => {
    const data = await request.json() as any;
    console.log('[MSW] Intercepted Jira Bug Creation:', data.fields.summary);
    return HttpResponse.json({
      id: "10000",
      key: "BUG-123",
      self: "http://127.0.0.1:9090/rest/api/2/issue/10000"
    }, { status: 201 });
  })
];
