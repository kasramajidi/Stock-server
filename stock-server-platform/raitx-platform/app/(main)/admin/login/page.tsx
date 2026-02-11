import AdminLoginForm from "./AdminLoginForm";

interface AdminLoginPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const resolvedSearchParams = await searchParams;
  const nextRaw = resolvedSearchParams?.next;
  const nextPath = Array.isArray(nextRaw) ? nextRaw[0] : nextRaw ?? null;
  return <AdminLoginForm nextPath={nextPath} />;
}
