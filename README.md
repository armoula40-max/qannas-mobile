# Qannas Mobile

تطبيق Android محلي لرادار عملات Solana ووكيل تحليل بالذكاء الاصطناعي.

## التشغيل

```bash
npm install
npx expo start
```

## إنشاء APK

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

## الأمان

- مفتاح CodeCraft يدخل محلياً ويحفظ عبر Expo SecureStore.
- ربط X سيكون عبر OAuth 2.0 PKCE؛ لا يجمع التطبيق كلمة مرور X.
- لا ينفذ التطبيق صفقات أو ينشر منشورات افتراضياً.
