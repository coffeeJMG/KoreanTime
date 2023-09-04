import getScheduleList from "../actions/getScheduleList";
import ScheduleList from "../components/SchedulList";

const StartPage = async () => {
    const scheduleList = await getScheduleList();

    console.log(scheduleList);
    return (
        <>
            <ScheduleList />
        </>
    );
};

export default StartPage;
