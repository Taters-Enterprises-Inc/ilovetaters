import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function TermsAndCondition( ) {

    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, [location]);

    return (   
        <div className="w-[90%] mx-auto mt-[2%] mb-[3.5%]">
            
            <h1 className="text-secondary font-['Bebas_Neue'] tracking-[3px] lg:text-3xl md:text-2xl text-xl">
                Taters Snack Shop (Terms and Conditions)
            </h1>
                    
            <hr className="mt-2 mb-4 border-secondary"/>
                    
            <div className="space-y-4 text-secondary w-[95%] mx-auto h-[425px] overflow-y-scroll terms-scroll md:text-base text-sm">
                <p> 1. Customers can order through www.ilovetaters.com/delivery.</p>
                <p>
                    2. Delivery and/or pick up of items is from Mondays to Saturdays
                    between 10:00am to 5:00pm only.
                </p>
                <p> 3. Stocks are based on availability. </p>
                <p> 4. Minimum purchase value is at P500.00. </p>
                <p>
                    4. Address indicated in the system should be your{" "}
                    <strong>
                        ACTUAL DELIVERY ADDRESS. STRICTLY, NO CHANGING OF ACTUAL
                        DELIVERY ADDRESS
                    </strong>
                </p>
                <p>
                    5. Due to <strong>ENHANCED COMMUNITY QUARANTINE</strong> there are
                    certain areas that are in total lockdown. Any falsification of
                    delivery address is subject for CANCELLATION OF ORDERS (regardless
                    whether PAID or NOT).{" "}
                    <strong>STRICTLY, NO CHANGING OF ACTUAL DELIVERY ADDRESS</strong>.
                </p>
                <p>
                    6. If you know that your area is under a{" "}
                    <strong>TOTAL LOCKDOWN IMPLEMENTATION</strong>, please do not
                    proceed in submitting your orders to avoid any inconvenience.
                </p>
                <p>
                    7. Payment can be done via : BDO BANK DEPOSIT, BDO ONLINE
                    TRANSFER, BPI BANK DEPOSIT, BPI ONLINE TRANSFER.{" "}
                    <strong>Payment</strong> should be made at a{" "}
                    <strong>maximum of one (1) hour</strong> after placing your order
                    in the system.
                </p>
                <p>
                    8. Once payment has been made, upload the{" "}
                    <strong>payment screenshot</strong> on the link provided in the
                    order confirmation email or go to{" "}
                    <strong>www.ilovetaters.com/profile</strong>.
                </p>
                <p>
                    9. Once a payment has been verified, customer will receive a
                    verification message via SMS.
                </p>
                <p>
                    10. <strong>Cash on Delivery</strong> is now accepted. Payment
                    should be made upon receiving the order - for both order and
                    delivery fee.
                </p>
                <p className="mb-0">
                    11. Wait for the call or text of the sales representative if
                    orders are now ready for pick-up and or delivery :
                    <p className="mb-0 ml-[30px]">
                        <u>
                        <i> If for pick-up:</i> to give the exact address of the
                            pick-up location and what to pin in the customer’s chosen
                            delivery service.
                        </u>
                    </p>
                            
                    <p className="mb-0 ml-[30px]">
                        <u>
                            <i> If for delivery:</i> to ask the customer the address on
                            what to pin (in Waze)
                        </u>
                    </p>
                            
                    <p className="mb-0 ml-[30px]">
                        OR you may view the status of your order at{" "}
                        <u className="text-blue-400">www.ilovetaters.com/profile</u>{" "}
                        Just input your tracking and mobile number. Once order status
                        indicates “for dispatch” it means orders are now ready for
                        -up or delivery.
                    </p>
                </p>
                <p> 12. Calls will only be made from Mondays to Saturdays between 10:00am to 5:00pm. </p>
                <p> 13. No additional orders can be made during the call with the sales representative. </p>
                <p> 14. Taters can opt to use whether an in-house delivery or a third party service to deliver the orders. </p>
            </div>                  
        </div>
    );
}