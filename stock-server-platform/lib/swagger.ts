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
    "/contact": {
      post: {
        summary: "ارسال پرسش / تماس",
        description: "عمومی. پس از ثبت، ایمیل به شرکت (kasramajidy81@gmail.com) ارسال می‌شود.",
        operationId: "submitContact",
        tags: ["Contact"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["fullName", "email", "message"],
                properties: {
                  fullName: { type: "string", example: "علی رضایی" },
                  email: { type: "string", format: "email", example: "user@example.com" },
                  message: { type: "string", example: "متن نظر یا پرسش" },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "پیام ارسال شد و ایمیل به شرکت رفت" },
          "400": { description: "خطای اعتبارسنجی" },
        },
      },
      get: {
        summary: "لیست پرسش‌ها",
        description: "فقط ادمین. Authorization: Bearer <token>",
        operationId: "listContactInquiries",
        tags: ["Contact"],
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "لیست پرسش‌ها" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" } },
      },
    },
    "/contact/approved": {
      get: {
        summary: "لیست پرسش‌های تایید شده",
        description: "فقط ادمین. فقط رکوردهایی که status آن‌ها approved است.",
        operationId: "listContactApproved",
        tags: ["Contact"],
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "لیست پرسش‌های تایید شده" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" } },
      },
    },
    "/contact/not-approved": {
      get: {
        summary: "لیست پرسش‌های تایید نشده",
        description: "فقط ادمین. وضعیت pending و rejected.",
        operationId: "listContactNotApproved",
        tags: ["Contact"],
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "لیست پرسش‌های تایید نشده (در انتظار + رد شده)" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" } },
      },
    },
    "/contact/{id}": {
      get: {
        summary: "دریافت یک پرسش",
        description: "فقط ادمین",
        operationId: "getContactInquiry",
        tags: ["Contact"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "پرسش" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" }, "404": { description: "یافت نشد" } },
      },
      patch: {
        summary: "تایید/رد پرسش و ارسال پاسخ به ایمیل کاربر",
        description: "فقط ادمین. Body: { status: \"approved\" | \"rejected\", adminResponse?: string }",
        operationId: "reviewContactInquiry",
        tags: ["Contact"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string", enum: ["approved", "rejected"] },
                  adminResponse: { type: "string" },
                },
              },
            },
          },
        },
        responses: { "200": { description: "بروزرسانی شد و ایمیل به کاربر ارسال شد" }, "400": { description: "وضعیت نامعتبر" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" }, "404": { description: "یافت نشد" } },
      },
      delete: {
        summary: "حذف پرسش",
        description: "فقط ادمین",
        operationId: "deleteContactInquiry",
        tags: ["Contact"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "حذف شد" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" } },
      },
    },
    "/users": {
      get: {
        summary: "لیست همه کاربران",
        description: "فقط ادمین. نیاز به هدر Authorization: Bearer <token>",
        operationId: "listUsers",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "لیست کاربران",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    count: { type: "number" },
                    users: { type: "array", items: { $ref: "#/components/schemas/UserPublic" } },
                  },
                },
              },
            },
          },
          "401": { description: "توکن ارسال نشده یا نامعتبر" },
          "403": { description: "فقط ادمین" },
        },
      },
    },
    "/users/{mobile}": {
      get: {
        summary: "دریافت یک کاربر با موبایل",
        description: "ادمین یا خود کاربر. Authorization: Bearer <token>",
        operationId: "getUserByMobile",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "mobile", in: "path", required: true, schema: { type: "string", example: "09123456789" } }],
        responses: { "200": { description: "کاربر" }, "401": { description: "توکن نامعتبر" }, "403": { description: "دسترسی غیرمجاز" }, "404": { description: "کاربر یافت نشد" } },
      },
      patch: {
        summary: "بروزرسانی کاربر با موبایل",
        description: "ادمین یا خود کاربر. فیلدهای اختیاری: fullName, email",
        operationId: "updateUserByMobile",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "mobile", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  fullName: { type: "string" },
                  email: { type: "string", format: "email" },
                },
              },
            },
          },
        },
        responses: { "200": { description: "کاربر بروزرسانی شد" }, "400": { description: "بدنه نامعتبر" }, "401": { description: "توکن نامعتبر" }, "403": { description: "دسترسی غیرمجاز" }, "404": { description: "کاربر یافت نشد" } },
      },
      delete: {
        summary: "حذف کاربر با موبایل",
        description: "فقط ادمین. امکان حذف خود ادمین وجود ندارد.",
        operationId: "deleteUserByMobile",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "mobile", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "کاربر حذف شد" }, "400": { description: "امکان حذف خودتان نیست" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" }, "404": { description: "کاربر یافت نشد" } },
      },
    },
    "/users/{mobile}/ban": {
      patch: {
        summary: "بن / آنبن کاربر با موبایل",
        description: "فقط ادمین. Body: { banned: true | false }",
        operationId: "banUserByMobile",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "mobile", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { banned: { type: "boolean", example: true } },
              },
            },
          },
        },
        responses: { "200": { description: "وضعیت بن بروزرسانی شد" }, "400": { description: "امکان بن خودتان نیست" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" }, "404": { description: "کاربر یافت نشد" } },
      },
    },
    "/articles": {
      get: {
        summary: "لیست مقالات",
        description: "عمومی. مرتب‌سازی از جدیدترین به قدیمی‌ترین. Query: search= برای جستجو در عنوان.",
        operationId: "listArticles",
        tags: ["Articles"],
        parameters: [
          { name: "search", in: "query", required: false, schema: { type: "string" }, description: "جستجو در عنوان" },
        ],
        responses: {
          "200": {
            description: "لیست مقالات (بدون فیلد content در لیست)",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    count: { type: "number" },
                    articles: { type: "array", items: { $ref: "#/components/schemas/ArticleListItem" } },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "ایجاد مقاله",
        description: "فقط ادمین. فیلدها: image (URL)، title، publishedAt (اختیاری)، tags (آرایه)، category، content (rich text)، excerpt.",
        operationId: "createArticle",
        tags: ["Articles"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ArticleCreate" },
            },
          },
        },
        responses: {
          "201": { description: "مقاله ایجاد شد" },
          "400": { description: "خطای اعتبارسنجی" },
          "401": { description: "توکن نامعتبر" },
          "403": { description: "فقط ادمین" },
        },
      },
    },
    "/articles/{id}": {
      get: {
        summary: "دریافت یک مقاله",
        description: "عمومی. با هر بار فراخوانی، تعداد بازدید (viewCount) یکی افزایش می‌یابد.",
        operationId: "getArticle",
        tags: ["Articles"],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          "200": {
            description: "مقاله به‌همراه محتوا و viewCount بروزشده",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    article: { $ref: "#/components/schemas/Article" },
                  },
                },
              },
            },
          },
          "404": { description: "مقاله یافت نشد" },
        },
      },
      patch: {
        summary: "ویرایش مقاله",
        description: "فقط ادمین. فیلدهای اختیاری برای بروزرسانی.",
        operationId: "updateArticle",
        tags: ["Articles"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  image: { type: "string", format: "uri" },
                  title: { type: "string" },
                  publishedAt: { type: "string", format: "date-time" },
                  tags: { type: "array", items: { type: "string" } },
                  category: { type: "string" },
                  content: { type: "string" },
                  excerpt: { type: "string" },
                },
              },
            },
          },
        },
        responses: { "200": { description: "مقاله بروزرسانی شد" }, "400": { description: "بدنه نامعتبر" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" }, "404": { description: "مقاله یافت نشد" } },
      },
      delete: {
        summary: "حذف مقاله",
        description: "فقط ادمین",
        operationId: "deleteArticle",
        tags: ["Articles"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "مقاله حذف شد" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" }, "404": { description: "مقاله یافت نشد" } },
      },
    },
    "/articles/{id}/comments": {
      get: {
        summary: "لیست کامنت‌های یک مقاله",
        description: "عمومی. پیش‌فرض فقط approved. برای دیدن همه: ?approvedOnly=false (ادمین). پاسخ‌ها به صورت تو در تو (replies).",
        operationId: "listArticleComments",
        tags: ["Comments"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه مقاله" },
          { name: "approvedOnly", in: "query", required: false, schema: { type: "string", enum: ["true", "false"] }, description: "پیش‌فرض true" },
        ],
        responses: { "200": { description: "لیست کامنت‌ها با user و replies" }, "404": { description: "مقاله یافت نشد" } },
      },
      post: {
        summary: "ثبت کامنت یا پاسخ",
        description: "نیاز به لاگین. Body: { content, parentId? } — parentId برای پاسخ به یک کامنت.",
        operationId: "createComment",
        tags: ["Comments"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه مقاله" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["content"],
                properties: {
                  content: { type: "string", maxLength: 2000 },
                  parentId: { type: "string", description: "ایدی کامنتی که داریم بهش جواب می‌دیم (برای پاسخ تو در تو)" },
                },
              },
            },
          },
        },
        responses: { "201": { description: "کامنت ثبت شد (pending تا تایید)" }, "400": { description: "خطای اعتبارسنجی" }, "401": { description: "توکن نامعتبر" }, "403": { description: "حساب مسدود" }, "404": { description: "مقاله یافت نشد" } },
      },
    },
    "/comments": {
      get: {
        summary: "لیست کامنت‌ها (بر اساس دسته‌بندی مقاله)",
        description: "فقط ادمین. Query: category= برای فیلتر بر اساس دسته‌بندی مقاله.",
        operationId: "listCommentsByCategory",
        tags: ["Comments"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "category", in: "query", required: false, schema: { type: "string" } }],
        responses: { "200": { description: "لیست کامنت‌ها با user و article" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" } },
      },
    },
    "/comments/{id}": {
      get: {
        summary: "دریافت یک کامنت",
        description: "با جزئیات کاربر، مقاله و پاسخ‌ها.",
        operationId: "getComment",
        tags: ["Comments"],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "کامنت" }, "404": { description: "کامنت یافت نشد" } },
      },
      patch: {
        summary: "ویرایش کامنت / تایید یا رد کامنت توسط ادمین",
        description: [
          "**ادمین — تایید یا رد کامنت:** با ارسال فقط status (و در صورت نیاز adminReply) کامنت را تایید یا رد کنید تا در صفحه مقاله نمایش داده شود یا نشود. مثال تایید: { \"status\": \"approved\" }. مثال رد با پاسخ: { \"status\": \"rejected\", \"adminReply\": \"دلیل رد\" }.",
          "**ادمین — پاسخ به کامنت:** برای گذاشتن پاسخ زیر کامنت: { \"status\": \"approved\", \"adminReply\": \"متن پاسخ کارشناس\" }.",
          "**صاحب کامنت:** فقط می‌تواند content (متن کامنت) را ویرایش کند؛ ارسال status یا adminReply برای کاربر عادی اعمال نمی‌شود.",
        ].join("\n\n"),
        operationId: "updateComment",
        tags: ["Comments"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه کامنت" }],
        requestBody: {
          required: false,
          content: {
            "application/json": {
              schema: {
                type: "object",
                description: "ادمین: برای تایید/رد و پاسخ از status و adminReply استفاده کنید. صاحب کامنت: فقط content.",
                properties: {
                  content: { type: "string", maxLength: 2000, description: "ویرایش متن کامنت (صاحب کامنت)" },
                  status: {
                    type: "string",
                    enum: ["approved", "rejected"],
                    description: "فقط ادمین. approved = تایید و نمایش در صفحه مقاله؛ rejected = رد و عدم نمایش.",
                  },
                  adminReply: {
                    type: "string",
                    maxLength: 2000,
                    description: "فقط ادمین. متن پاسخ کارشناس به کامنت (اختیاری).",
                  },
                },
                example: {
                  status: "approved",
                  adminReply: "پاسخ کارشناس به کامنت کاربر.",
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "کامنت بروزرسانی شد (تایید/رد یا ویرایش متن)." },
          "400": { description: "بدنه نامعتبر" },
          "401": { description: "توکن نامعتبر" },
          "403": { description: "دسترسی غیرمجاز" },
          "404": { description: "کامنت یافت نشد" },
        },
      },
      delete: {
        summary: "حذف کامنت",
        description: "صاحب کامنت یا ادمین.",
        operationId: "deleteComment",
        tags: ["Comments"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "کامنت حذف شد" }, "401": { description: "توکن نامعتبر" }, "403": { description: "دسترسی غیرمجاز" }, "404": { description: "کامنت یافت نشد" } },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "توکن دریافتی از login یا signup",
      },
    },
    schemas: {
      UserPublic: {
        type: "object",
        properties: {
          id: { type: "string" },
          fullName: { type: "string" },
          mobile: { type: "string" },
          email: { type: "string" },
          role: { type: "string", enum: ["user", "admin"] },
          isBanned: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      ArticleListItem: {
        type: "object",
        properties: {
          id: { type: "string" },
          image: { type: "string", nullable: true },
          title: { type: "string" },
          publishedAt: { type: "string", format: "date-time" },
          tags: { type: "array", items: { type: "string" } },
          viewCount: { type: "integer" },
          category: { type: "string" },
          excerpt: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Article: {
        type: "object",
        properties: {
          id: { type: "string" },
          image: { type: "string", nullable: true },
          title: { type: "string" },
          publishedAt: { type: "string", format: "date-time" },
          tags: { type: "array", items: { type: "string" } },
          viewCount: { type: "integer" },
          content: { type: "string", description: "rich text" },
          category: { type: "string" },
          excerpt: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      ArticleCreate: {
        type: "object",
        required: ["title", "category", "content", "excerpt"],
        properties: {
          image: { type: "string", format: "uri", nullable: true },
          title: { type: "string" },
          publishedAt: { type: "string", format: "date-time" },
          tags: { type: "array", items: { type: "string" }, default: [] },
          category: { type: "string" },
          content: { type: "string", description: "rich text" },
          excerpt: { type: "string", description: "متن کوتاه برای معرفی" },
        },
      },
    },
  },
  tags: [
    { name: "Auth", description: "ثبت‌نام و ورود" },
    { name: "Contact", description: "پرسش و تماس (ارسال به شرکت + تایید/رد ادمین)" },
    { name: "Users", description: "مدیریت کاربران (نیاز به JWT)" },
    { name: "Articles", description: "مقالات — لیست، جستجو، ایجاد، ویرایش، حذف" },
    { name: "Comments", description: "کامنت مقالات — ثبت، لیست، تایید/رد، پاسخ ادمین، پاسخ تو در تو" },
  ],
} as const;
