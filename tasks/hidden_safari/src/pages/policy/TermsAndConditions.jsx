import React from "react";
import SectionHeader from "../../components/section_header/SectionHeader";
import PolicyCard from "../../components/card/TextDisplayCard";

export default function TermsAndConditions() {
  const pageDetails = {
    mainText: "Terms And Conditions",
    minorText: "Our",
    description: "Meet the heroes behind our success.",
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          mainText={pageDetails.mainText}
          minorText={pageDetails.minorText}
          description={pageDetails.description}
        />

        <div className="grid grid-cols-1 gap-6 px-4 md:px-8">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">
              Booking, Payments and Cancellations
            </h2>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-amber-700 mb-2">
              1. Booking Confirmation
            </h3>
            <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed">
              After a client requests a quote on our website, we promptly send a
              comprehensive itinerary to their email address. This detailed
              itinerary outlines the various destinations they will visit, the
              activities they will do, and accommodations where they will stay,
              allowing them to gain a clear understanding of what to anticipate.
              Following this, it is imperative for the client to either confirm
              their acceptance of the proposed itinerary or provide suggestions
              for any modifications they desire.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              The safari services agreed upon with the client throughout this
              process will be diligently provided, except in the event of
              unforeseen circumstances, such as road closures, bad weather, or
              security concerns. In such cases, the itinerary may be changed or
              terminated (see sections 5.3.2. and 6.2.).
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-amber-700 mb-2">
              2. Payment
            </h3>
            <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed">
              Payments can be made by bank wire/transfer, debit or credit card
              as well as other direct card payments.
            </p>

            <p className="text-sm md:text-base text-gray-700 mb-2 leading-relaxed">
              After clients accept a proposal, they receive an invoice with all
              details. We require a 50% deposit payment of the itinerary cost
              within 10 days of receiving the invoice and 100% upfront payment
              if the booking was made within 61 days prior to departure. We
              cannot guarantee a booking if a deposit or a full amount is
              delayed.
            </p>
            <p className="text-sm md:text-base text-gray-700 mb-2 leading-relaxed"></p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              The safari services agreed upon with the client throughout this
              process will be diligently provided, except in the event of
              unforeseen circumstances, such as road closures, bad weather, or
              security concerns. In such cases, the itinerary may be changed or
              terminated (see sections 5.3.2. and 6.2.).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
