import {
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

function ContactUs() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">

      {/* Header */}
      <section className="bg-[#343E4F] px-5 py-16 text-center text-white sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#E57036]">
          Get In Touch
        </p>

        <h1 className="mt-3 text-3xl font-bold sm:text-5xl">
          Contact D-Agro Market AI
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base">
          Have a question, suggestion, or need help? Our team is ready to
          assist you.
        </p>
      </section>


      {/* Contact content */}
      <section className="px-5 py-12 sm:px-8 sm:py-16">

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">

          {/* Contact information */}
          <div>

            <h2 className="text-2xl font-bold text-[#343E4F]">
              Let's Talk
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Whether you are a farmer, buyer, supplier, or transport
              provider, we would love to hear from you.
            </p>

            <div className="mt-8 space-y-5">

              <ContactInfo
                icon={<Mail size={20} />}
                title="Email"
                value="info@dagromarket.ai"
              />

              <ContactInfo
                icon={<Phone size={20} />}
                title="Phone"
                value="+251 900 000 000"
              />

              <ContactInfo
                icon={<MapPin size={20} />}
                title="Location"
                value="Addis Ababa, Ethiopia"
              />

            </div>

          </div>


          {/* Form */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

            <h2 className="text-xl font-bold text-[#343E4F]">
              Send Us a Message
            </h2>

            <form className="mt-6 space-y-4">

              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E57036]"
              />

              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E57036]"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E57036]"
              />

              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#E57036]"
              />

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#E57036] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Send Message
                <Send size={16} />
              </button>

            </form>

          </div>

        </div>

      </section>

    </div>
  );
}


function ContactInfo({ icon, title, value }) {
  return (
    <div className="flex items-center gap-4">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#E57036]">
        {icon}
      </div>

      <div>
        <p className="text-xs text-gray-500">
          {title}
        </p>

        <p className="text-sm font-semibold text-[#343E4F]">
          {value}
        </p>
      </div>

    </div>
  );
}

export default ContactUs;