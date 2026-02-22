/**
 * OpenAPI (Swagger) spec برای API های Next.js
 */
export const openApiDoc = {
  openapi: "3.0.0",
  info: {
    title: "Stock Server API",
    version: "1.0.0",
    description: "API سامانه استوک سرور. شامل: احراز هویت (ثبت‌نام/ورود)، پرسش و تماس، چت پشتیبانی، مدیریت کاربران، مقالات وبلاگ، کامنت مقالات، و محصولات فروشگاه. برای endpointهای محافظت‌شده هدر Authorization: Bearer <توکن> الزامی است.",
  },
  servers: [
    { url: "/api", description: "API Base" },
  ],
  paths: {
    "/auth/signup": {
      post: {
        summary: "ثبت‌نام",
        description: "**برای چی:** ساخت حساب کاربری جدید. بعد از ثبت‌نام یک توکن JWT (۱۵ روز اعتبار) برمی‌گردد که برای فراخوانی APIهای محافظت‌شده (مثل پروفایل، کامنت، و برای ادمین: مدیریت کاربران/محصولات/مقالات) استفاده می‌شود.",
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
                  fullName: { type: "string", example: "علی رضایی", description: "نام و نام خانوادگی کاربر" },
                  mobile: { type: "string", example: "09123456789", description: "شماره موبایل (یکتا؛ برای ورود استفاده می‌شود)" },
                  email: { type: "string", format: "email", example: "example@mail.com", description: "ایمیل (یکتا)" },
                  password: { type: "string", minLength: 8, example: "********", description: "رمز عبور (حداقل ۸ کاراکتر)" },
                  acceptTerms: { type: "boolean", example: true, description: "پذیرش قوانین و مقررات؛ باید true باشد" },
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
        description: "**برای چی:** ورود به حساب با موبایل و رمز. در ازای موفق، توکن JWT (۱۵ روز) برمی‌گردد. این توکن را در هدر Authorization: Bearer <token> برای APIهای نیازمند لاگین بفرست.",
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
                  mobile: { type: "string", example: "09123456789", description: "شماره موبایل ثبت‌نام‌شده" },
                  password: { type: "string", example: "********", description: "رمز عبور" },
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
    "/auth/logout": {
      post: {
        summary: "خروج",
        description: "**برای چی:** برای یکدستی با کلاینت؛ خروج واقعی با پاک کردن توکن و کوکی در سمت کلاینت (clearAuth) انجام می‌شود. این endpoint همیشه 200 برمی‌گردد.",
        operationId: "logout",
        tags: ["Auth"],
        responses: { "200": { description: "خروج با موفقیت انجام شد." } },
      },
    },
    "/contact": {
      post: {
        summary: "ارسال پرسش / تماس",
        description: "**برای چی:** ارسال پیام از فرم «تماس با ما» توسط بازدیدکننده. بدون نیاز به لاگین. بعد از ثبت، یک ایمیل به شرکت (kasramajidy81@gmail.com) ارسال می‌شود تا کارشناس مطلع شود.",
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
                  fullName: { type: "string", example: "علی رضایی", description: "نام و نام خانوادگی فرستنده" },
                  email: { type: "string", format: "email", example: "user@example.com", description: "ایمیل برای دریافت پاسخ" },
                  message: { type: "string", example: "متن نظر یا پرسش", description: "متن پیام/سوال کاربر" },
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
        description: "**برای چی:** ادمین برای دیدن همه پیام‌های دریافتی از فرم تماس از این endpoint استفاده می‌کند. نیاز به توکن ادمین دارد.",
        operationId: "listContactInquiries",
        tags: ["Contact"],
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "لیست پرسش‌ها" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" } },
      },
    },
    "/contact/approved": {
      get: {
        summary: "لیست پرسش‌های تایید شده",
        description: "**برای چی:** فقط پرسش‌هایی که ادمین آن‌ها را تایید (approved) کرده برای نمایش یا گزارش.",
        operationId: "listContactApproved",
        tags: ["Contact"],
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "لیست پرسش‌های تایید شده" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" } },
      },
    },
    "/contact/not-approved": {
      get: {
        summary: "لیست پرسش‌های تایید نشده",
        description: "**برای چی:** پرسش‌های در انتظار بررسی (pending) یا رد شده (rejected) تا ادمین آن‌ها را بررسی یا پاسخ دهد.",
        operationId: "listContactNotApproved",
        tags: ["Contact"],
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "لیست پرسش‌های تایید نشده (در انتظار + رد شده)" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" } },
      },
    },
    "/contact/{id}": {
      get: {
        summary: "دریافت یک پرسش",
        description: "**برای چی:** گرفتن جزئیات یک پرسش تماس با id برای نمایش در پنل یا قبل از تایید/رد.",
        operationId: "getContactInquiry",
        tags: ["Contact"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه (cuid) پرسش" }],
        responses: { "200": { description: "پرسش" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" }, "404": { description: "یافت نشد" } },
      },
      patch: {
        summary: "تایید/رد پرسش و ارسال پاسخ به ایمیل کاربر",
        description: "**برای چی:** ادمین بعد از بررسی، پرسش را approved یا rejected می‌کند و در صورت تمایل متن پاسخ (adminResponse) را می‌نویسد؛ این پاسخ به ایمیل کاربر ارسال می‌شود.",
        operationId: "reviewContactInquiry",
        tags: ["Contact"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه پرسش" }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string", enum: ["approved", "rejected"], description: "وضعیت نهایی پرسش" },
                  adminResponse: { type: "string", description: "متن پاسخ به کاربر؛ به ایمیلش ارسال می‌شود" },
                },
              },
            },
          },
        },
        responses: { "200": { description: "بروزرسانی شد و ایمیل به کاربر ارسال شد" }, "400": { description: "وضعیت نامعتبر" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" }, "404": { description: "یافت نشد" } },
      },
      delete: {
        summary: "حذف پرسش",
        description: "**برای چی:** حذف یک پرسش تماس از لیست (فقط ادمین).",
        operationId: "deleteContactInquiry",
        tags: ["Contact"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه پرسش" }],
        responses: { "200": { description: "حذف شد" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" } },
      },
    },
    "/users": {
      get: {
        summary: "لیست همه کاربران",
        description: "**برای چی:** ادمین برای دیدن لیست تمام کاربران ثبت‌نام‌شده (و در صورت نیاز کامنت‌های هر کاربر). فقط با توکن ادمین.",
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
        description: "**برای چی:** گرفتن پروفایل یک کاربر با شماره موبایل. ادمین هر کاربری را ببیند؛ کاربر عادی فقط پروفایل خودش.",
        operationId: "getUserByMobile",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "mobile", in: "path", required: true, schema: { type: "string", example: "09123456789" }, description: "شماره موبایل کاربر" }],
        responses: { "200": { description: "کاربر" }, "401": { description: "توکن نامعتبر" }, "403": { description: "دسترسی غیرمجاز" }, "404": { description: "کاربر یافت نشد" } },
      },
      patch: {
        summary: "بروزرسانی کاربر با موبایل",
        description: "**برای چی:** ویرایش نام یا ایمیل کاربر. ادمین هر کاربری؛ کاربر عادی فقط خودش. فیلدهای اختیاری: fullName, email.",
        operationId: "updateUserByMobile",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "mobile", in: "path", required: true, schema: { type: "string" }, description: "موبایل کاربری که ویرایش می‌شود" }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  fullName: { type: "string", description: "نام و نام خانوادگی جدید" },
                  email: { type: "string", format: "email", description: "ایمیل جدید" },
                },
              },
            },
          },
        },
        responses: { "200": { description: "کاربر بروزرسانی شد" }, "400": { description: "بدنه نامعتبر" }, "401": { description: "توکن نامعتبر" }, "403": { description: "دسترسی غیرمجاز" }, "404": { description: "کاربر یافت نشد" } },
      },
      delete: {
        summary: "حذف کاربر با موبایل",
        description: "**برای چی:** حذف دائمی حساب یک کاربر. فقط ادمین؛ ادمین نمی‌تواند خودش را حذف کند.",
        operationId: "deleteUserByMobile",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "mobile", in: "path", required: true, schema: { type: "string" }, description: "موبایل کاربری که حذف می‌شود" }],
        responses: { "200": { description: "کاربر حذف شد" }, "400": { description: "امکان حذف خودتان نیست" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" }, "404": { description: "کاربر یافت نشد" } },
      },
    },
    "/users/{mobile}/ban": {
      patch: {
        summary: "بن / آنبن کاربر با موبایل",
        description: "**برای چی:** مسدود یا رفع مسدودیت کردن کاربر (banned: true/false). کاربر بن‌شده نمی‌تواند لاگین کند. فقط ادمین.",
        operationId: "banUserByMobile",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "mobile", in: "path", required: true, schema: { type: "string" }, description: "موبایل کاربر" }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { banned: { type: "boolean", example: true, description: "true = مسدود، false = رفع مسدودیت" } },
              },
            },
          },
        },
        responses: { "200": { description: "وضعیت بن بروزرسانی شد" }, "400": { description: "امکان بن خودتان نیست" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" }, "404": { description: "کاربر یافت نشد" } },
      },
    },
    "/users/{mobile}/role": {
      patch: {
        summary: "تنظیم نقش کاربر (ادمین کردن با موبایل)",
        description: "**برای چی:** ادمین با ارسال شماره موبایل و نقش (admin یا user)، آن کاربر را ادمین می‌کند یا به کاربر عادی برمی‌گرداند. ادمین نمی‌تواند نقش خودش را تغییر دهد.",
        operationId: "setUserRoleByMobile",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "mobile", in: "path", required: true, schema: { type: "string" }, description: "شماره موبایل کاربر" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["role"],
                properties: { role: { type: "string", enum: ["admin", "user"], description: "admin = ادمین کردن، user = برگرداندن به کاربر عادی" } },
              },
            },
          },
        },
        responses: { "200": { description: "نقش بروزرسانی شد و کاربر برگردانده می‌شود" }, "400": { description: "نقش نامعتبر یا تغییر نقش خودتان" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" }, "404": { description: "کاربر یافت نشد" } },
      },
    },
    "/articles": {
      get: {
        summary: "لیست مقالات",
        description: "**برای چی:** نمایش لیست مقالات وبلاگ (صفحه اصلی وبلاگ یا آرشیو). عمومی؛ بدون توکن. مرتب از جدید به قدیم. با search در عنوان جستجو می‌شود. هر مقاله شامل کامنت‌ها و ادمین سازنده (createdBy) است.",
        operationId: "listArticles",
        tags: ["Articles"],
        parameters: [
          { name: "search", in: "query", required: false, schema: { type: "string" }, description: "جستجو در عنوان مقاله" },
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
        description: "**برای چی:** ادمین مقاله جدید در وبلاگ منتشر می‌کند. بعد از ایجاد، به همه کاربران ثبت‌نام‌شده ایمیل «مقاله جدید» ارسال می‌شود. ادمین سازنده در createdBy ذخیره می‌شود.",
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
        description: "**برای چی:** نمایش صفحه تک مقاله با محتوا و امتیاز بازدید. با هر بار فراخوانی viewCount یکی اضافه می‌شود. شامل createdBy (ادمین سازنده) است.",
        operationId: "getArticle",
        tags: ["Articles"],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه (cuid) مقاله" }],
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
        description: "**برای چی:** ادمین محتوای یک مقاله (عنوان، تصویر، دسته، متن، خلاصه و غیره) را ویرایش می‌کند.",
        operationId: "updateArticle",
        tags: ["Articles"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه مقاله" }],
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
        description: "**برای چی:** حذف دائمی یک مقاله (و کامنت‌هایش). فقط ادمین.",
        operationId: "deleteArticle",
        tags: ["Articles"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه مقاله" }],
        responses: { "200": { description: "مقاله حذف شد" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" }, "404": { description: "مقاله یافت نشد" } },
      },
    },
    "/articles/{id}/comments": {
      get: {
        summary: "لیست کامنت‌های یک مقاله",
        description: "**برای چی:** نمایش کامنت‌های زیر یک مقاله (با ساختار تو در تو replies). پیش‌فرض فقط کامنت‌های تاییدشده؛ ادمین با approvedOnly=false همه را می‌بیند.",
        operationId: "listArticleComments",
        tags: ["Comments"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه مقاله" },
          { name: "approvedOnly", in: "query", required: false, schema: { type: "string", enum: ["true", "false"] }, description: "true = فقط تاییدشده (پیش‌فرض)، false = همه" },
        ],
        responses: { "200": { description: "لیست کامنت‌های مقاله با user و replies" }, "404": { description: "مقاله یافت نشد" } },
      },
      post: {
        summary: "ثبت کامنت یا پاسخ",
        description: "**برای چی:** کاربر لاگین‌شده زیر یک مقاله کامنت می‌گذارد یا به کامنت دیگری پاسخ می‌دهد (با parentId). بعد از تایید ادمین در صفحه نمایش داده می‌شود.",
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
        summary: "لیست کامنت‌های مقاله",
        description: "**برای چی:** ادمین لیست کامنت‌های مقالات را می‌بیند. با category فیلتر دسته‌بندی مقاله. برای کامنت محصولات از /api/product-comments استفاده کن.",
        operationId: "listCommentsByCategory",
        tags: ["Comments"],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "category", in: "query", required: false, schema: { type: "string" }, description: "دسته‌بندی مقاله برای فیلتر" },
        ],
        responses: { "200": { description: "لیست کامنت‌های مقاله با user و article" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" } },
      },
    },
    "/comments/{id}": {
      get: {
        summary: "دریافت یک کامنت مقاله",
        description: "**برای چی:** گرفتن جزئیات یک کامنت مقاله (کاربر، مقاله، پاسخ‌ها). فقط ادمین یا صاحب کامنت. برای کامنت محصول از GET /api/product-comments/[id] استفاده کن.",
        operationId: "getComment",
        tags: ["Comments"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه کامنت مقاله" }],
        responses: { "200": { description: "کامنت مقاله" }, "401": { description: "توکن نامعتبر" }, "403": { description: "دسترسی غیرمجاز" }, "404": { description: "کامنت یافت نشد" } },
      },
      patch: {
        summary: "ویرایش کامنت مقاله / تایید یا رد توسط ادمین",
        description: [
          "**برای چی:** ادمین کامنت مقاله را تایید یا رد می‌کند (و در صورت نیاز پاسخ می‌گذارد)؛ کاربر عادی فقط متن کامنت خودش را ویرایش می‌کند. برای کامنت محصول از PATCH /api/product-comments/[id] استفاده کن.",
          "**ادمین — تایید یا رد کامنت:** با ارسال فقط status (و در صورت نیاز adminReply) کامنت را تایید یا رد کنید. مثال تایید: { \"status\": \"approved\" }. مثال رد با پاسخ: { \"status\": \"rejected\", \"adminReply\": \"دلیل رد\" }.",
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
        summary: "حذف کامنت مقاله",
        description: "**برای چی:** حذف یک کامنت مقاله. صاحب کامنت فقط کامنت خودش؛ ادمین هر کامنتی را می‌تواند حذف کند. برای کامنت محصول از DELETE /api/product-comments/[id] استفاده کن.",
        operationId: "deleteComment",
        tags: ["Comments"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه کامنت مقاله" }],
        responses: { "200": { description: "کامنت حذف شد" }, "401": { description: "توکن نامعتبر" }, "403": { description: "دسترسی غیرمجاز" }, "404": { description: "کامنت یافت نشد" } },
      },
    },
    "/product-comments": {
      get: {
        summary: "لیست کامنت‌های محصول",
        description: "**برای چی:** ادمین لیست کامنت‌های محصولات را می‌بیند. با category فیلتر دسته‌بندی محصول.",
        operationId: "listProductComments",
        tags: ["ProductComments"],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "category", in: "query", required: false, schema: { type: "string" }, description: "دسته‌بندی محصول برای فیلتر" },
        ],
        responses: { "200": { description: "لیست کامنت‌های محصول با user و product" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" } },
      },
    },
    "/product-comments/{id}": {
      get: {
        summary: "دریافت یک کامنت محصول",
        description: "**برای چی:** گرفتن جزئیات یک کامنت محصول (کاربر، محصول، پاسخ‌ها). فقط ادمین یا صاحب کامنت.",
        operationId: "getProductComment",
        tags: ["ProductComments"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه کامنت محصول" }],
        responses: { "200": { description: "کامنت محصول" }, "401": { description: "توکن نامعتبر" }, "403": { description: "دسترسی غیرمجاز" }, "404": { description: "کامنت یافت نشد" } },
      },
      patch: {
        summary: "ویرایش کامنت محصول / تایید یا رد توسط ادمین",
        description: "**برای چی:** ادمین کامنت محصول را تایید یا رد می‌کند (و در صورت نیاز پاسخ می‌گذارد)؛ کاربر عادی فقط متن کامنت خودش را ویرایش می‌کند. همان ساختار body مثل PATCH /api/comments/[id] (content، status، adminReply).",
        operationId: "updateProductComment",
        tags: ["ProductComments"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه کامنت محصول" }],
        requestBody: {
          required: false,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  content: { type: "string", maxLength: 2000 },
                  status: { type: "string", enum: ["approved", "rejected"] },
                  adminReply: { type: "string", maxLength: 2000 },
                },
              },
            },
          },
        },
        responses: { "200": { description: "کامنت بروزرسانی شد" }, "400": { description: "بدنه نامعتبر" }, "401": { description: "توکن نامعتبر" }, "403": { description: "دسترسی غیرمجاز" }, "404": { description: "کامنت یافت نشد" } },
      },
      delete: {
        summary: "حذف کامنت محصول",
        description: "**برای چی:** حذف یک کامنت محصول. صاحب کامنت یا ادمین.",
        operationId: "deleteProductComment",
        tags: ["ProductComments"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه کامنت محصول" }],
        responses: { "200": { description: "کامنت حذف شد" }, "401": { description: "توکن نامعتبر" }, "403": { description: "دسترسی غیرمجاز" }, "404": { description: "کامنت یافت نشد" } },
      },
    },
    "/cart-requests": {
      get: {
        summary: "لیست درخواست‌های سبد خرید",
        description: "**برای چی:** کاربر درخواست‌های خودش را می‌بیند؛ ادمین همه درخواست‌ها را. با توکن احراز هویت.",
        operationId: "listCartRequests",
        tags: ["CartRequests"],
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "لیست درخواست‌ها با items و user" }, "401": { description: "توکن نامعتبر" } },
      },
      post: {
        summary: "ثبت درخواست سبد خرید",
        description: "**برای چی:** کاربر لاگین‌شده لیست محصولات موردنظر (productId + quantity) و در صورت تمایل یک note ارسال می‌کند. بعد از ثبت، ایمیل به کارفرما ارسال می‌شود.",
        operationId: "createCartRequest",
        tags: ["CartRequests"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["items"],
                properties: {
                  items: {
                    type: "array",
                    minItems: 1,
                    items: {
                      type: "object",
                      required: ["productId", "quantity"],
                      properties: {
                        productId: { type: "string", description: "شناسه (cuid) محصول" },
                        quantity: { type: "integer", minimum: 1, description: "تعداد" },
                      },
                    },
                  },
                  note: { type: "string", maxLength: 2000, description: "توضیح یا درخواست اختیاری کاربر" },
                },
              },
            },
          },
        },
        responses: { "201": { description: "درخواست ثبت شد و ایمیل به کارفرما ارسال شد" }, "400": { description: "خطای اعتبارسنجی یا محصول یافت نشد" }, "401": { description: "توکن نامعتبر" }, "403": { description: "حساب مسدود" } },
      },
    },
    "/cart-requests/{id}": {
      get: {
        summary: "دریافت جزئیات یک درخواست سبد خرید",
        description: "**برای چی:** کاربر جزئیات درخواست خودش؛ ادمین هر درخواستی را می‌بیند.",
        operationId: "getCartRequest",
        tags: ["CartRequests"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه درخواست" }],
        responses: { "200": { description: "درخواست با items و user" }, "401": { description: "توکن نامعتبر" }, "403": { description: "دسترسی غیرمجاز" }, "404": { description: "درخواست یافت نشد" } },
      },
      patch: {
        summary: "بروزرسانی وضعیت یا یادداشت ادمین (فقط ادمین)",
        description: "**برای چی:** ادمین وضعیت درخواست (pending | in_progress | completed | cancelled) یا adminNote را بروزرسانی می‌کند.",
        operationId: "updateCartRequest",
        tags: ["CartRequests"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه درخواست" }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string", enum: ["pending", "in_progress", "completed", "cancelled"] },
                  adminNote: { type: "string", maxLength: 2000 },
                },
              },
            },
          },
        },
        responses: { "200": { description: "درخواست بروزرسانی شد" }, "400": { description: "بدنه نامعتبر" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" }, "404": { description: "درخواست یافت نشد" } },
      },
      delete: {
        summary: "حذف درخواست سبد خرید",
        description: "**برای چی:** کاربر فقط درخواست خودش را حذف می‌کند؛ ادمین هر درخواستی را می‌تواند حذف کند.",
        operationId: "deleteCartRequest",
        tags: ["CartRequests"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه درخواست" }],
        responses: { "200": { description: "درخواست حذف شد" }, "401": { description: "توکن نامعتبر" }, "403": { description: "دسترسی غیرمجاز" }, "404": { description: "درخواست یافت نشد" } },
      },
    },
    "/products": {
      get: {
        summary: "لیست محصولات",
        description: "**برای چی:** نمایش لیست محصولات فروشگاه (صفحه فروشگاه یا دسته‌بندی). عمومی. با search/category/brand فیلتر و با order مرتب (جدیدترین یا پربازدید). هر محصول شامل content، specs و createdBy (ادمین سازنده) است.",
        operationId: "listProducts",
        tags: ["Products"],
        parameters: [
          { name: "search", in: "query", required: false, schema: { type: "string" }, description: "جستجو در عنوان محصول" },
          { name: "category", in: "query", required: false, schema: { type: "string" }, description: "فیلتر بر اساس دسته‌بندی" },
          { name: "brand", in: "query", required: false, schema: { type: "string" }, description: "فیلتر بر اساس برند" },
          { name: "order", in: "query", required: false, schema: { type: "string", enum: ["newest", "views"] }, description: "مرتب‌سازی: newest یا views" },
        ],
        responses: { "200": { description: "لیست محصولات (شامل content، specs، createdBy)" } },
      },
      post: {
        summary: "ایجاد محصول",
        description: "**برای چی:** ادمین محصول جدید در فروشگاه ثبت می‌کند. slug یکتا (می‌تواند همان title باشد). ادمین سازنده در createdBy ذخیره و در API برمی‌گردد.",
        operationId: "createProduct",
        tags: ["Products"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProductCreate" },
            },
          },
        },
        responses: { "201": { description: "محصول ایجاد شد" }, "400": { description: "خطای اعتبارسنجی یا slug تکراری" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" } },
      },
    },
    "/products/{id}": {
      get: {
        summary: "دریافت یک محصول",
        description: "**برای چی:** نمایش صفحه تک محصول با تمام جزئیات (content، specs، createdBy). id می‌تواند cuid، slug یا عنوان دقیق باشد. با هر فراخوانی viewCount یکی اضافه می‌شود.",
        operationId: "getProduct",
        tags: ["Products"],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه (cuid)، slug یا عنوان دقیق محصول" }],
        responses: { "200": { description: "محصول به‌همراه content، specs، createdBy" }, "404": { description: "محصول یافت نشد" } },
      },
      patch: {
        summary: "ویرایش محصول",
        description: "**برای چی:** ادمین اطلاعات یک محصول (عنوان، توضیحات، برند، قیمت نمایشی، مشخصات و غیره) را ویرایش می‌کند. id فقط cuid است.",
        operationId: "updateProduct",
        tags: ["Products"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه (cuid) محصول" }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  slug: { type: "string" },
                  title: { type: "string" },
                  shortDescription: { type: "string" },
                  content: { type: "string" },
                  category: { type: "string" },
                  brand: { type: "string" },
                  partNumbers: { type: "array", items: { type: "string" } },
                  priceLabel: { type: "string" },
                  inStock: { type: "boolean" },
                  statusLabel: { type: "string" },
                  rating: { type: "integer", minimum: 1, maximum: 5 },
                  image: { type: "string" },
                  specs: { type: "object", description: "مشخصات فنی (key/value)" },
                },
              },
            },
          },
        },
        responses: { "200": { description: "محصول بروزرسانی شد" }, "400": { description: "بدنه نامعتبر یا slug تکراری" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" }, "404": { description: "محصول یافت نشد" } },
      },
      delete: {
        summary: "حذف محصول",
        description: "**برای چی:** حذف دائمی یک محصول از فروشگاه. فقط ادمین.",
        operationId: "deleteProduct",
        tags: ["Products"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه (cuid) محصول" }],
        responses: { "200": { description: "محصول حذف شد" }, "401": { description: "توکن نامعتبر" }, "403": { description: "فقط ادمین" }, "404": { description: "محصول یافت نشد" } },
      },
    },
    "/support/start": {
      post: {
        summary: "شروع مکالمه چت پشتیبانی",
        description: "**برای چی:** کاربر نام، نام خانوادگی و شماره موبایل می‌دهد و یک مکالمه چت ساخته می‌شود. در پاسخ conversationId و clientToken برمی‌گردد؛ با این توکن کاربر می‌تواند پیام بفرستد و بخواند (از طریق GET/POST /support/conversations/{id}/messages?token=...). بدون نیاز به لاگین.",
        operationId: "supportStart",
        tags: ["Support"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["firstName", "lastName", "phone"],
                properties: {
                  firstName: { type: "string", example: "علی", description: "نام" },
                  lastName: { type: "string", example: "رضایی", description: "نام خانوادگی" },
                  phone: { type: "string", example: "09123456789", description: "شماره موبایل (۱۱ رقم با ۰۹)" },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "مکالمه ایجاد شد",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    conversationId: { type: "string", description: "شناسه مکالمه برای دریافت/ارسال پیام" },
                    clientToken: { type: "string", description: "توکن سمت کاربر؛ در query با نام token ارسال شود" },
                  },
                },
              },
            },
          },
          "400": { description: "خطای اعتبارسنجی (نام/موبایل)" },
        },
      },
    },
    "/support/conversations/{id}/messages": {
      get: {
        summary: "دریافت پیام‌های یک مکالمه (کاربر)",
        description: "**برای چی:** کاربر با conversationId و token (clientToken دریافتی از POST /support/start) لیست پیام‌های مکالمه را می‌گیرد. برای پیام‌های پشتیبانی، admin (fullName، avatarUrl) برمی‌گردد. supportSeenAt برای نمایش تیک «دیده شده» است.",
        operationId: "supportGetMessages",
        tags: ["Support"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه مکالمه (conversationId)" },
          { name: "token", in: "query", required: true, schema: { type: "string" }, description: "clientToken همان مکالمه" },
        ],
        responses: {
          "200": {
            description: "لیست پیام‌ها و زمان دیده‌شدن توسط پشتیبانی",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    messages: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          senderType: { type: "string", enum: ["user", "support"] },
                          content: { type: "string" },
                          createdAt: { type: "string", format: "date-time" },
                          admin: {
                            type: "object",
                            nullable: true,
                            properties: { fullName: { type: "string" }, avatarUrl: { type: "string", nullable: true } },
                            description: "فقط برای senderType=support",
                          },
                        },
                      },
                    },
                    supportSeenAt: { type: "string", format: "date-time", nullable: true, description: "آخرین زمانی که پشتیبانی چت را دید (برای تیک دیده شده)" },
                  },
                },
              },
            },
          },
          "401": { description: "توکن ارسال نشده یا نامعتبر" },
          "404": { description: "مکالمه یافت نشد" },
        },
      },
      post: {
        summary: "ارسال پیام کاربر در چت پشتیبانی",
        description: "**برای چی:** کاربر با conversationId و token یک پیام (content) در همان مکالمه ارسال می‌کند.",
        operationId: "supportSendMessage",
        tags: ["Support"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه مکالمه" },
          { name: "token", in: "query", required: true, schema: { type: "string" }, description: "clientToken" },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["content"],
                properties: { content: { type: "string", minLength: 1, maxLength: 2000, description: "متن پیام" } },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "پیام ارسال شد",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        senderType: { type: "string", example: "user" },
                        content: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
                      },
                    },
                  },
                },
              },
            },
          },
          "400": { description: "خطای اعتبارسنجی" },
          "401": { description: "توکن ارسال نشده یا نامعتبر" },
          "404": { description: "مکالمه یافت نشد" },
        },
      },
    },
    "/admin/support/conversations": {
      get: {
        summary: "لیست مکالمات چت پشتیبانی (ادمین)",
        description: "**برای چی:** ادمین لیست همه مکالمات چت را می‌بیند (نام، موبایل، آخرین پیام، زمان به‌روزرسانی). نیاز به توکن ادمین.",
        operationId: "adminSupportListConversations",
        tags: ["Support"],
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "لیست مکالمات",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    conversations: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          firstName: { type: "string" },
                          lastName: { type: "string" },
                          phone: { type: "string" },
                          createdAt: { type: "string", format: "date-time" },
                          updatedAt: { type: "string", format: "date-time" },
                          lastMessage: {
                            type: "object",
                            nullable: true,
                            properties: {
                              content: { type: "string" },
                              senderType: { type: "string" },
                              createdAt: { type: "string", format: "date-time" },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "401": { description: "توکن نامعتبر" },
          "403": { description: "فقط ادمین" },
        },
      },
    },
    "/admin/support/conversations/{id}/messages": {
      get: {
        summary: "دریافت پیام‌های یک مکالمه (ادمین)",
        description: "**برای چی:** ادمین با انتخاب یک مکالمه، جزئیات (نام، موبایل کاربر) و لیست پیام‌ها را می‌گیرد. با هر بار فراخوانی، supportSeenAt به‌روز می‌شود (تیک «دیده شده» برای کاربر). پیام‌های support شامل admin (ادمین فرستنده) هستند.",
        operationId: "adminSupportGetMessages",
        tags: ["Support"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه مکالمه" }],
        responses: {
          "200": {
            description: "جزئیات مکالمه و لیست پیام‌ها",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    conversation: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        firstName: { type: "string" },
                        lastName: { type: "string" },
                        phone: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
                      },
                    },
                    messages: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          senderType: { type: "string", enum: ["user", "support"] },
                          content: { type: "string" },
                          createdAt: { type: "string", format: "date-time" },
                          admin: {
                            type: "object",
                            nullable: true,
                            properties: { id: { type: "string" }, fullName: { type: "string" }, avatarUrl: { type: "string", nullable: true } },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "401": { description: "توکن نامعتبر" },
          "403": { description: "فقط ادمین" },
          "404": { description: "مکالمه یافت نشد" },
        },
      },
      post: {
        summary: "ارسال پاسخ پشتیبانی (ادمین)",
        description: "**برای چی:** ادمین در یک مکالمه پاسخ می‌فرستد. ادمین فرستنده به‌صورت خودکار (adminId) ذخیره می‌شود و برای کاربر با نام و عکس نمایش داده می‌شود.",
        operationId: "adminSupportSendMessage",
        tags: ["Support"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه مکالمه" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["content"],
                properties: { content: { type: "string", minLength: 1, maxLength: 2000, description: "متن پاسخ" } },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "پیام پشتیبانی ارسال شد",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    message: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        senderType: { type: "string", example: "support" },
                        content: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
                        admin: {
                          type: "object",
                          nullable: true,
                          properties: { fullName: { type: "string" }, avatarUrl: { type: "string", nullable: true } },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "400": { description: "خطای اعتبارسنجی" },
          "401": { description: "توکن نامعتبر" },
          "403": { description: "فقط ادمین" },
          "404": { description: "مکالمه یافت نشد" },
        },
      },
    },
    "/cron/cleanup-support-chat": {
      get: {
        summary: "پاکسازی چت پشتیبانی (GET)",
        description: "همان پاکسازی؛ برای cronهایی که فقط GET پشتیبانی می‌کنند. مکالمات قدیمی‌تر از ۳۰ دقیقه حذف می‌شوند.",
        operationId: "cronCleanupSupportChatGet",
        tags: ["Support"],
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "پاکسازی انجام شد",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    deleted: { type: "number", description: "تعداد مکالمات حذف‌شده" },
                    message: { type: "string" },
                  },
                },
              },
            },
          },
          "401": { description: "توکن ارسال نشده یا نامعتبر" },
          "403": { description: "فقط ادمین یا CRON_SECRET" },
        },
      },
      post: {
        summary: "پاکسازی چت پشتیبانی (حذف مکالمات قدیمی‌تر از ۳۰ دقیقه)",
        description: "**برای چی:** مکالمات چت پشتیبانی که بیش از ۳۰ دقیقه از ایجادشان گذشته حذف می‌شوند (پیام‌ها به‌صورت cascade حذف می‌شوند). فراخوانی با توکن ادمین (JWT) یا با کلید cron: Authorization: Bearer <CRON_SECRET>. برای اجرای خودکار هر ۵–۱۰ دقیقه از cron (مثلاً Vercel Cron، Render Cron یا cron-job.org) استفاده کن.",
        operationId: "cronCleanupSupportChat",
        tags: ["Support"],
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "پاکسازی انجام شد",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    deleted: { type: "number", description: "تعداد مکالمات حذف‌شده" },
                    message: { type: "string" },
                  },
                },
              },
            },
          },
          "401": { description: "توکن ارسال نشده یا نامعتبر" },
          "403": { description: "فقط ادمین یا CRON_SECRET" },
        },
      },
    },
    "/products/{id}/comments": {
      get: {
        summary: "لیست کامنت‌های یک محصول",
        description: "**برای چی:** نمایش کامنت‌های زیر یک محصول (با ساختار تو در تو replies). پیش‌فرض فقط کامنت‌های تاییدشده؛ ادمین با approvedOnly=false همه را می‌بیند. id می‌تواند cuid یا slug محصول باشد.",
        operationId: "listProductCommentsByProduct",
        tags: ["ProductComments"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه (cuid) یا slug محصول" },
          { name: "approvedOnly", in: "query", required: false, schema: { type: "string", enum: ["true", "false"] }, description: "true = فقط تاییدشده (پیش‌فرض)، false = همه" },
        ],
        responses: { "200": { description: "لیست کامنت‌های محصول با user و replies" }, "404": { description: "محصول یافت نشد" } },
      },
      post: {
        summary: "ثبت کامنت یا پاسخ زیر محصول",
        description: "**برای چی:** کاربر لاگین‌شده زیر یک محصول کامنت می‌گذارد یا به کامنت دیگری پاسخ می‌دهد (با parentId). بعد از تایید ادمین در صفحه محصول نمایش داده می‌شود. id می‌تواند cuid یا slug محصول باشد.",
        operationId: "createProductComment",
        tags: ["ProductComments"],
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" }, description: "شناسه (cuid) یا slug محصول" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["content"],
                properties: {
                  content: { type: "string", maxLength: 2000, description: "متن کامنت" },
                  parentId: { type: "string", description: "ایدی کامنتی که داریم بهش جواب می‌دیم (برای پاسخ تو در تو)" },
                },
              },
            },
          },
        },
        responses: { "201": { description: "کامنت ثبت شد (pending تا تایید)" }, "400": { description: "خطای اعتبارسنجی" }, "401": { description: "توکن نامعتبر" }, "403": { description: "حساب مسدود" }, "404": { description: "محصول یافت نشد" } },
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
        description: "نمایش عمومی کاربر (پروفایل، لیست کاربران ادمین). در لیست کاربران ممکن است آرایه comments هم برگردد.",
        type: "object",
        properties: {
          id: { type: "string", description: "شناسه یکتای کاربر (cuid)" },
          fullName: { type: "string", description: "نام و نام خانوادگی" },
          mobile: { type: "string", description: "شماره موبایل (برای ورود)" },
          email: { type: "string", description: "ایمیل" },
          role: { type: "string", enum: ["user", "admin"], description: "نقش: user یا admin" },
          isBanned: { type: "boolean", description: "آیا کاربر مسدود شده (بن) است" },
          createdAt: { type: "string", format: "date-time", description: "تاریخ ثبت‌نام" },
          updatedAt: { type: "string", format: "date-time", description: "آخرین بروزرسانی" },
        },
      },
      ArticleListItem: {
        description: "یک آیتم مقاله در لیست (بدون محتوای کامل؛ برای کارت/لیست وبلاگ).",
        type: "object",
        properties: {
          id: { type: "string", description: "شناسه مقاله" },
          image: { type: "string", nullable: true, description: "آدرس تصویر شاخص (اختیاری)" },
          title: { type: "string", description: "عنوان مقاله" },
          publishedAt: { type: "string", format: "date-time", description: "تاریخ انتشار" },
          tags: { type: "array", items: { type: "string" }, description: "برچسب‌ها" },
          viewCount: { type: "integer", description: "تعداد بازدید" },
          category: { type: "string", description: "دسته‌بندی مقاله" },
          excerpt: { type: "string", description: "خلاصه کوتاه برای پیش‌نمایش" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Article: {
        description: "مقاله کامل با محتوای rich text؛ برای صفحه تک مقاله. ممکن است createdBy (ادمین سازنده) هم برگردد.",
        type: "object",
        properties: {
          id: { type: "string", description: "شناسه مقاله" },
          image: { type: "string", nullable: true, description: "تصویر شاخص" },
          title: { type: "string", description: "عنوان" },
          publishedAt: { type: "string", format: "date-time", description: "تاریخ انتشار" },
          tags: { type: "array", items: { type: "string" }, description: "برچسب‌ها" },
          viewCount: { type: "integer", description: "تعداد بازدید" },
          content: { type: "string", description: "محتوا (rich text / HTML)" },
          category: { type: "string", description: "دسته‌بندی" },
          excerpt: { type: "string", description: "خلاصه برای معرفی" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      ArticleCreate: {
        description: "بدنه ایجاد مقاله (POST /api/articles). فیلدهای اجباری: title, category, content, excerpt.",
        type: "object",
        required: ["title", "category", "content", "excerpt"],
        properties: {
          image: { type: "string", format: "uri", nullable: true, description: "آدرس تصویر شاخص (اختیاری؛ می‌تواند خالی یا مسیر نسبی)" },
          title: { type: "string", description: "عنوان مقاله" },
          publishedAt: { type: "string", format: "date-time", description: "تاریخ انتشار (اختیاری؛ پیش‌فرض الان)" },
          tags: { type: "array", items: { type: "string" }, default: [], description: "برچسب‌ها" },
          category: { type: "string", description: "دسته‌بندی مقاله" },
          content: { type: "string", description: "محتوا (rich text)" },
          excerpt: { type: "string", description: "خلاصه کوتاه برای معرفی در لیست" },
        },
      },
      ProductCreate: {
        description: "بدنه ایجاد محصول (POST /api/products). slug یکتا؛ ادمین سازنده به‌صورت خودکار ذخیره می‌شود.",
        type: "object",
        required: ["slug", "title", "shortDescription", "content", "category", "brand", "priceLabel", "statusLabel"],
        properties: {
          slug: { type: "string", description: "شناسه یکتا برای URL؛ می‌تواند همان عنوان (مثلاً فارسی) باشد" },
          title: { type: "string", description: "عنوان محصول" },
          shortDescription: { type: "string", description: "توضیح کوتاه (مثلاً برای کارت محصول)" },
          content: { type: "string", description: "توضیحات کامل (HTML)" },
          category: { type: "string", description: "دسته‌بندی محصول" },
          brand: { type: "string", description: "برند" },
          partNumbers: { type: "array", items: { type: "string" }, default: [], description: "شماره قطعات / مدل‌ها" },
          priceLabel: { type: "string", example: "برای استعلام موجودی تماس بگیرید", description: "متن نمایشی قیمت (مثلاً «تماس بگیرید»)" },
          inStock: { type: "boolean", default: true, description: "آیا موجود است" },
          statusLabel: { type: "string", example: "آماده ارسال", description: "وضعیت نمایشی (مثلاً آماده ارسال)" },
          rating: { type: "integer", minimum: 1, maximum: 5, nullable: true, description: "امتیاز ۱ تا ۵ (اختیاری)" },
          image: { type: "string", nullable: true, description: "آدرس تصویر محصول (اختیاری)" },
          specs: { type: "object", description: "مشخصات فنی به صورت key/value (اختیاری)" },
        },
      },
    },
  },
  tags: [
    { name: "Auth", description: "ثبت‌نام و ورود" },
    { name: "Contact", description: "پرسش و تماس (ارسال به شرکت + تایید/رد ادمین)" },
    { name: "Support", description: "چت پشتیبانی — شروع مکالمه، ارسال/دریافت پیام (کاربر با token؛ ادمین با JWT)" },
    { name: "Users", description: "مدیریت کاربران (نیاز به JWT)" },
    { name: "Articles", description: "مقالات — لیست، جستجو، ایجاد، ویرایش، حذف" },
    { name: "Comments", description: "کامنت مقالات — ثبت، لیست، تایید/رد، پاسخ ادمین، پاسخ تو در تو" },
    { name: "ProductComments", description: "کامنت محصولات — ثبت، لیست، تایید/رد، پاسخ ادمین، پاسخ تو در تو (جدا از کامنت مقاله)" },
    { name: "CartRequests", description: "درخواست سبد خرید — کاربر ثبت درخواست (لیست محصول + تعداد)، ادمین مشاهده و بروزرسانی وضعیت؛ ایمیل به کارفرما" },
    { name: "Products", description: "محصولات فروشگاه — لیست، جستجو، فیلتر، ایجاد، ویرایش، حذف" },
  ],
} as const;
