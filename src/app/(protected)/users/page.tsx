"use client";
import { getUsers } from "@/apis/users";
import { IUsersResponse } from "@/types/users";
import { useCallback, useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState<IUsersResponse[] | null>(null);

  const getUsersList = useCallback(async () => {
    try {
      const users = await getUsers();

      if (users?.status === 200) {
        setUsers(users.data);
      }
    } catch (error) {
      return error;
    }
  }, []);

  useEffect(() => {
    getUsersList();
  }, []);

  console.log({ users });
  return <div>hi</div>;
};

export default UsersPage;
