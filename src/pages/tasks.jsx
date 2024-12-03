import AddTaskDropDown from "../components/addtask";
import DashboardStrats from "../components/dashboardstats";
import LatestTask from "../components/latesttask";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Table from "../components/table";

export default function Tasks() {
  return (
    <div className="[&::-webkit-scrollbar]:hidden md:max-h-screen h-full">
      <Navbar></Navbar>
      <div className="w-full min-h-screen [&::-webkit-scrollbar]:hidden ">
        <div className="flex flex-row ">
          <div className=" h-full">
            <Sidebar></Sidebar>
          </div>
          <div className="w-full flex flex-col md:flex-row">
            <div className="w-full flex flex-col p-2">
              <DashboardStrats></DashboardStrats>
              <Table className="w-3/4"></Table>
            </div>
            <div className="flex h-full flex-col justify-around">
              <LatestTask className="h-1/3"></LatestTask>
              <AddTaskDropDown className="h-2/3"></AddTaskDropDown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
