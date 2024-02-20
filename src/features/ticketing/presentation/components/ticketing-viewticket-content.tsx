import { Divider } from "@mui/material";
import { MaterialInput } from "features/shared/presentation/components";
import { useState } from "react";

// interface formData {
//   ticketReply: string;
// }

export function ViewTicketContents() {
  //   const [formState, setFormState] = useState<formData>({
  //     ticketReply: "",
  //   });

  //   const handleOnChange = (value: string, property: string) => {
  //     setFormState((prevValue) => ({
  //       ...prevValue,
  //       [property]: value,
  //     }));
  //   };

  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col border border-gray-200 rounded-md shadow-sm bg-white p-6 space-y-3 w-full md:w-3/3">
          <div className="flex justify-between items-center">
            <span className="text-secondary text-3xl font-['Bebas_Neue'] flex">
              Ticket #159
            </span>
            <span>
              <span className="text-secondary font-medium">Status:</span>{" "}
              <span
                className="px-4 py-1 text-white rounded-full"
                style={{ backgroundColor: "#cca300" }}
              >
                Open
              </span>
            </span>
          </div>
          <Divider />
          <div className="flex flex-col space-y-2">
            <div>
              <span className="text-secondary font-medium">Title:</span>{" "}
              <span>My PC isn't Working</span>
            </div>
            <div>
              <span className="text-secondary font-medium">Date Created:</span>{" "}
              <span>February 13, 2024</span>
            </div>
            <div>
              <span className="text-secondary font-medium">Department:</span>{" "}
              <span>Management Information System</span>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col space-y-3">
            <div>
              <div className="text-secondary font-medium mb-2">
                Description:
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                sit amet ante ac neque aliquet ultricies. Sed tempus, orci ac
                ultrices ultrices, neque nunc malesuada diam, at pharetra lectus
                quam eget urna. Sed at felis vel purus viverra sollicitudin.
                Aenean efficitur vitae nunc a commodo. Aliquam erat volutpat.
                Nulla facilisi. Donec nec nisl nec velit facilisis facilisis.
                Sed sodales, libero eu consectetur efficitur, orci dui
                pellentesque metus, nec tincidunt libero lacus nec eros. Integer
                ac dui ac justo viverra molestie. Cras euismod, sem ac aliquet
                rhoncus, lectus nunc facilisis libero, ut bibendum lectus orci a
                libero. Sed euismod, orci sed facilisis fringilla, erat ipsum
                placerat lectus, ac tincidunt nisl ipsum in tortor. Donec
                euismod, dui sed volutpat malesuada, purus lacus semper velit, a
                volutpat libero libero eu d
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex justify-end">
            <button
              className="bg-green-700 text-white px-6 py-2 rounded-md"
              type="submit"
            >
              Change Ticket Status
            </button>
          </div>
        </div>
        <div className="my-5">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-5">
            <span className="text-white text-3xl font-['Bebas_Neue'] flex">
              Replies
            </span>
          </div>
          <div className="p-6 bg-paper border-b-2 border-l-2 border-r-2 border-secondary space-y-5">
            <div className="border border-gray-200 rounded-md shadow-sm bg-white p-6 space-y-3 w-full">
              <div className="flex justify-between mb-2">
                <span className=" text-gray-900 font-semibold">
                  Allan Solis
                </span>
                <span className="text-gray-600">February 14, 2024</span>
              </div>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
                voluptates, modi recusandae, excepturi maxime nam adipisci ipsum
                cumque illo quaerat obcaecati nostrum ex voluptatem, totam omnis
                laboriosam provident porro accusamus expedita beatae magni
                ullam. Ipsa iure labore fugit earum, dignissimos, unde vero
                asperiores aut maiores tempore qui eligendi mollitia, odio nemo
                error architecto? Blanditiis iste magnam nemo expedita delectus
                eius hic explicabo. Nulla nisi excepturi nam. Rem perferendis
                fugit dolorem! Vero nostrum quasi nam commodi fugiat explicabo
                deserunt inventore nulla.
              </p>
            </div>
            {/* comment section */}
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows={6}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-primary text-white px-6 py-2 rounded-md"
                type="submit"
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
