import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const Comment = ({ comment, setProductComments }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});

  async function handleDeleteComment() {
    try {
      const res = await fetch(`/api/comment/${comment._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        console.log(data.error);
        return;
      }
      setProductComments((prev) =>
        prev.filter((prevComment) => prevComment._id !== comment._id)
      );
      toast.success("Your comment has been deleted!");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch(`/api/user/${comment.userId}`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.error) {
          console.log(data.error);
          return;
        }
        setUser(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getUser();
  }, [comment.userId]);

  return (
    <div className="flex flex-col gap-4 border p-4 font-light">
      <div className="flex items-center justify-between">
        <p>(users rating)</p>{" "}
        {currentUser._id === user._id && (
          <button onClick={handleDeleteComment}>
            <FaRegTrashAlt color="red" fill="red" />
          </button>
        )}
      </div>
      <p>{comment.createdAt}</p>
      <p>{user.username}</p>
      <p className="">{comment.text}</p>
    </div>
  );
};
