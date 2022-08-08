
interface ProgressBarProps {
    percentage: number;
    className?: string;
}

export function ProgressBar(props : ProgressBarProps){
    const percentage = props.percentage.toString();
    return (
        <div className={'h-[13px] bg-primaryOrange ease-in duration-300 ' + props.className} style={{width: percentage + '%'}}>
        </div>
    );
}