import React from "react";
import Faq from "react-faq-component";

const data = {
    title: <div className="font-bold text-4xl text-center mb-10">FAQs (How it works)</div>,
    rows: [
        {
            title: <h3 className="p-2 text-xl font-semibold">How do I book a rag picker?</h3>,
            content: <p className="p-4  text-[20px] text-white">To book a rag picker, simply select the date and time you need them, and fill out the booking form with your details. 
            You will receive a confirmation once your booking is successful.</p>,
        },
        {
            title: <h3 className="p-2 text-xl font-semibold">What areas do you service?</h3>,
            content: <p className="p-4   text-[20px] text-white">We provide services in various localities. Please enter your address during the booking process to check if we service your area.</p>,
        },
        {
            title: <h3 className="p-2 text-xl font-semibold">How much does it cost?</h3>,
            content: <p className="p-4   text-[20px] text-white">The cost varies based on the volume of waste to be collected. You'll be provided with a quote before confirming your booking.</p>,
        },
        {
            title: <h3 className="p-2 text-xl font-semibold">What items can I recycle?</h3>,
            content: <p className="p-4   text-[20px] text-white">You can recycle paper, plastics, glass, and metals. For a complete list, please refer to our recycling guidelines on the website.</p>,
        },
        {
            title: <h3 className="p-2 text-xl font-semibold">Can I cancel or reschedule my booking?</h3>,
            content: <p className="p-4  text-[20px] text-white">Yes, you can cancel or reschedule your booking by contacting our customer service at least 24 hours in advance.</p>,
        },
        {
            title: <h3 className="p-2 text-xl font-semibold">What safety measures are in place?</h3>,
            content: <p className="p-4   text-[20px] text-white">All rag pickers follow safety protocols, including wearing masks and gloves. We ensure that all pickups are conducted safely.</p>,
        },
        {
            title: <h3 className="p-2 text-xl font-semibold">What payment methods are accepted?</h3>,
            content: <p className="p-4   text-[20px] text-white">We accept various payment methods including credit/debit cards, digital wallets, and cash on delivery.</p>,
        },
    ],
};

const styles = {
    bgColor: 'transparent',
    titleTextColor: "white",
    titleFontWeight: "bold",
    rowTitleColor: "white",
    rowContentColor: 'gray',
    arrowColor: "white",
    rowTitleTextColor: "white",
    rowContentTextColor: "gray",
    // Additional styles for a modern look
    rowContentTextSize: "14px",
};

const config = {
    animate: true,
    tabFocus: true,
    // Add some additional configuration for better UX

};

function FAQ() {
  return (
    <div className="my-10 p-1 rounded-lg shadow-lg">
      <Faq
        data={data}
        styles={styles}
        config={config}
      />
    </div>
  );
}

export default FAQ;
