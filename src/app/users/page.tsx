import { getUsers } from "@/services/users";

const Users = async () => {
  const { data } = await getUsers();

  return <div>{data?.mesg ?? "karlo"} </div>;
};

export default Users;
