import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Table } from "flowbite-react";

export const Dashboard = ({ users, totalUsers, lastMonthUsers }) => {
  return (
    <div className="flex flex-col justify-center gap-20">
      <div className="ml-28 flex gap-16 self-center">
        <div className="bg-[#28282f] flex flex-col p-4 gap-5 justify-between">
          <div className="flex items-center gap-32  rounded-lg">
            <div>
              <h2 className="text-lg text-gray-400">Total Users</h2>
              <h2 className="text-3xl  font-light">{totalUsers}</h2>
            </div>
            <div className="bg-green-300 text-4xl p-3 rounded-full">
              <HiOutlineUserGroup />
            </div>
          </div>
          <div className="flex items-center gap-2 ">
            <div className="flex items-center">
              <span className="text-xl text-green-700">{lastMonthUsers}</span>
              <HiArrowNarrowUp
                className="text-2xl"
                color="green"
                fill="green"
              />
            </div>
            <p className="text-gray-400">Last Month</p>
          </div>
        </div>
        <div className="bg-[#28282f] flex flex-col p-4 gap-5 justify-between">
          <div className="flex items-center gap-32  rounded-lg">
            <div>
              <h2 className="text-lg text-gray-400">Total Products</h2>
              <h2 className="text-3xl  font-light">{totalUsers}</h2>
            </div>
            <div className="bg-green-300 text-4xl p-3 rounded-full">
              <HiOutlineUserGroup />
            </div>
          </div>
          <div className="flex items-center gap-2 ">
            <div className="flex items-center">
              <span className="text-xl text-green-700">{lastMonthUsers}</span>
              <HiArrowNarrowUp
                className="text-2xl"
                color="green"
                fill="green"
              />
            </div>
            <p className="text-gray-400">Last Month</p>
          </div>
        </div>
        <div className="bg-[#28282f] flex flex-col p-4 gap-5 justify-between">
          <div className="flex items-center gap-32  rounded-lg">
            <div>
              <h2 className="text-lg text-gray-400">Total Users</h2>
              <h2 className="text-3xl  font-light">{totalUsers}</h2>
            </div>
            <div className="bg-green-300 text-4xl p-3 rounded-full">
              <HiOutlineUserGroup />
            </div>
          </div>
          <div className="flex items-center gap-2 ">
            <div className="flex items-center">
              <span className="text-xl text-green-700">{lastMonthUsers}</span>
              <HiArrowNarrowUp
                className="text-2xl"
                color="green"
                fill="green"
              />
            </div>
            <p className="text-gray-400">Last Month</p>
          </div>
        </div>
      </div>
      <div className="ml-36">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>User Image</Table.HeadCell>
            <Table.HeadCell>User username</Table.HeadCell>
            <Table.HeadCell>User Email</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users.map((user, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  <img
                    src={user.profilePicture}
                    alt="user profile"
                    className="w-16 h-16 rounded-full"
                  />
                </Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
