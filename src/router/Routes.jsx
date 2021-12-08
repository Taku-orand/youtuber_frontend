import { YoutuberDetail } from "../components/page/YoutuberDetail";
import { YoutuberList } from "../components/page/YoutuberList";
import { CreateYoutuber } from "../components/page/CreateYoutuber";
import { Edit } from "../components/page/Edit";

export const routes = [
  {
    path: "/",
    exact: true,
    children: <YoutuberList />,
  },
  {
    path: "/detail/:id",
    exact: true,
    children: <YoutuberDetail />,
  },
  {
    path: "/create",
    exact: true,
    children: <CreateYoutuber />,
  },
  {
    path: "/edit/:id",
    exact: true,
    children: <Edit />,
  }
];
