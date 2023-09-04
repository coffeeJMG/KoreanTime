import getScheduleList from "../actions/getScheduleList";
import ScheduleList from "../components/SchedulList";

const StartPage = async () => {
    const scheduleList = await getScheduleList();

    if (!scheduleList) {
        return null;
    }

    return (
        <>
            <ScheduleList scheduleList={scheduleList} />
        </>
    );
};

export default StartPage;
