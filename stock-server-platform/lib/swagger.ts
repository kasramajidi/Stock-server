/**
 * OpenAPI (Swagger) spec برای API های Next.js
 */
export const openApiDoc = {
  openapi: "3.0.0",
  info: {
    title: "Stock Server API",
    version: "1.0.0",
    description: "API فروشگاه استوک سرور — محصولات، سبد خرید، درخواست تماس",
  },
  servers: [
    { url: "/api", description: "API Base" },
  ],
  paths: {
    "/auth/signup": {
      post: {
        summary: "ثبت‌نام",
        description: "ثبت‌نام کاربر جدید — نام، موبایل، ایمیل، رمز عبور، پذیرش قوانین",
        operationId: "signup",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["fullName", "mobile", "email", "password", "acceptTerms"],
                properties: {
                  fullName: { type: "string", example: "علی رضایی" },
                  mobile: { type: "string", example: "09123456789" },
                  email: { type: "string", format: "email", example: "example@mail.com" },
                  password: { type: "string", minLength: 8, example: "********" },
                  acceptTerms: { type: "boolean", example: true },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "ثبت‌نام موفق — توکن JWT با انقضای ۱۵ روز برمی‌گردد.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string" },
                    token: { type: "string", description: "JWT برای احراز هویت (۱۵ روز اعتبار)" },
                    expiresInDays: { type: "number", example: 15 },
                    user: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        fullName: { type: "string" },
                        mobile: { type: "string" },
                        email: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
                      },
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "خطای اعتبارسنجی یا موبایل تکراری",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    errors: { type: "array", items: { type: "string" } },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/auth/login": {
      post: {
        summary: "ورود",
        description: "ورود با شماره موبایل و رمز عبور — توکن JWT با انقضای ۱۵ روز برمی‌گردد.",
        operationId: "login",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["mobile", "password"],
                properties: {
                  mobile: { type: "string", example: "09123456789" },
                  password: { type: "string", example: "********" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "ورود موفق",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string" },
                    token: { type: "string", description: "JWT (۱۵ روز اعتبار)" },
                    expiresInDays: { type: "number", example: 15 },
                    user: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        fullName: { type: "string" },
                        mobile: { type: "string" },
                        email: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
                      },
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "خطای اعتبارسنجی",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    errors: { type: "array", items: { type: "string" } },
                  },
                },
              },
            },
          },
          "401": {
            description: "موبایل یا رمز اشتباه",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    errors: { type: "array", items: { type: "string" } },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  tags: [{ name: "Auth", description: "ثبت‌نام و ورود" }],
} as const;
