// 認証のオプションをインポート

import { nextAuthOptions } from "@/app/lib/next-auth/options";
import NextAuth from "next-auth/next";
// 認証関連の構成や処理;
const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST };
// 他のモジュールで認証ハンドラーをGETやPOSTできるようにするもの
