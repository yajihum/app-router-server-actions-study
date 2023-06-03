import { authMiddleware } from "@clerk/nextjs";

// このmiddlewareを追加することでサーバーにアクセスする前に認証されているかをチェックしてくれる
// 今の場合は全ページにおいて認証されているかをチェックしているので、認証されていない場合は自動的にSignInページにリダイレクトされる
export default authMiddleware({
  publicRoutes: ["/"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
