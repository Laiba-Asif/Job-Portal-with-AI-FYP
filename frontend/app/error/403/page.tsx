export default function Custom404() {
  return (
    <div className="flex h-screen items-center justify-center flex-col gap-4">
      <h1 className="text-4xl font-bold">403 - Forbidden</h1>
      <p className="text-gray-600">
        Sorry, you have No Access To this Page , Please Authorize yourself!
      </p>
      <a href="/" className="text-blue-600 underline">
        Go back home
      </a>
    </div>
  );
}
