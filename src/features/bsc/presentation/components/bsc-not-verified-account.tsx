export function BscNotVerifiedUser() {
  return (
    <section className="container flex items-center h-screen mx-auto">
      <div className="lg:w-[80%]">
        <h1 className="text-4xl lg:text-6xl font-bold text-secondary lg:leading-[70px]">
          For security purposes, your account is pending review by our stuff
          before being activated.
        </h1>
        <h2 className="mt-1 mb-2 font-bold text-gray-900 lg:text-2xl">
          This usually takes around 1 business day to complete.
        </h2>

        <h3 className="font-bold text-gray-600 lg:text-lg">
          Please note, we may require additional documentation if we are unable
          to verify your identity.
        </h3>
      </div>
    </section>
  );
}
