import moment from "moment";
import Countdown from "react-countdown";



export function CountdownTimer(){
    var expirationDate : any = moment().add(5, 'seconds');
    
    const renderer = ({ hours, minutes, seconds, completed, date} : any) => {

        if (completed) {
        // Render a completed state
        return <div>Test</div>;
        } else {
        //   var now = moment();
        // var duration = moment.duration(expirationDate.diff(now));


            return <span className="text-white">{seconds}</span>;
        }
    };
  
    return (
        <Countdown  renderer={renderer} date={new Date()}/>
    );
}