import { lazy } from "react";

import withSuspense from "./withSuspense";
import PrivateRoute from "./PrivateRoute";

const Home = lazy(() => import("../pages/Home"));
const Roadmap = lazy(() => import("../pages/Roadmap"));
const Trending = lazy(() => import("../pages/Trending"));
const Projects = lazy(() => import("../pages/Projects"));
const Resources = lazy(() => import("../pages/Resources"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const RoadmapById = lazy(() => import("../pages/RoadmapById"));
const ResourceById = lazy(() => import("../pages/ResourceById"));
const FavouriteResources = lazy(() => import("../pages/FavouriteResources"));
const ContributeRoadmaps = lazy(() => import("../pages/ContributeRoadmaps"));
const ContributeResources = lazy(() => import("../pages/ContributeResources"));

const privateRoutes = [
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/home",
        element: withSuspense(<Home />),
      },
      {
        path: "/settings/profile",
        element: withSuspense(<ProfilePage />),
      },
      {
        path: "/resources",
        element: withSuspense(<Resources />),
      },
      {
        path: "/resource/:id",
        element: withSuspense(<ResourceById />),
      },
      {
        path: "/roadmaps",
        element: withSuspense(<Roadmap />),
      },
      {
        path: "/roadmap/:id",
        element: withSuspense(<RoadmapById />),
      },
      {
        path: "/contribute/resources",
        element: withSuspense(<ContributeResources />),
      },
      {
        path: "/contribute/roadmaps",
        element: withSuspense(<ContributeRoadmaps />),
      },
      {
        path: "/favorites/resources",
        element: withSuspense(<FavouriteResources />),
      },
      {
        path: "/projects",
        element: withSuspense(<Projects />),
      },
      {
        path: "/trending",
        element: withSuspense(<Trending />),
      },
    ],
  },
];

export default privateRoutes;
