"use client";
import { getUsers } from "@/apis/users";
import { IUsersResponse } from "@/types/users";
import { useCallback, useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState<IUsersResponse[] | null>(null);

  const getUsersList = useCallback(async () => {
    try {
      const users = await getUsers();
      console.log({ users });

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

  return <div>hi</div>;
};

export default UsersPage;
