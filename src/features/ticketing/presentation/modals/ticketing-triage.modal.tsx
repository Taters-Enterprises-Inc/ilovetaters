import { MaterialInputAutoComplete } from "features/shared/presentation/components";
import { IoMdClose } from "react-icons/io";
import { department } from "../components/ticketing-utils";
import { useState } from "react";
import { ticketingTriageTicket } from "../slices/ticketing-triage-ticket.slice";
import { useAppDispatch, useQuery } from "features/config/hooks";
import { ticketingTriageTicketParam } from "features/ticketing/core/ticketing.params";
import { getAllTickets } from "../slices/get-all-tickets.slice";
import { createQueryParams } from "features/config/helpers";

interface TicketingTriageModalProps {
  open: boolean;
  onClose: () => void;
}

interface formData {
  department: { id: number | undefined; name: string } | null;
}

export function TicketingTriageModal(props: TicketingTriageModalProps) {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const id = query.get("id");
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const status = query.get("status");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  const [formState, setFormState] = useState<formData>({
    department: null,
  });

  const handleOnChange = (value: string, property: string) => {
    setFormState((prevValue) => ({
      ...prevValue,
      [property]: value,
    }));
  };

  const handleOnSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const triageTicketParam: ticketingTriageTicketParam = {
      departmentId: formState.department?.id,
    };

    const params = {
      page_no: pageNo,
      per_page: perPage,
      status: status,
      order_by: orderBy,
      order: order,
      search: search,
    };

    dispatch(
      ticketingTriageTicket({ id: id ?? "", ticketData: triageTicketParam })
    )
      .then(() => {
        dispatch(getAllTickets(createQueryParams(params)));

        setFormState({
          department: null,
        });

        props.onClose();
      })
      .catch((error) => {
        console.error("Error updating department:", error);
      });
  };

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="w-[97%] lg:w-[900px] my-5 rounded-[10px]">
        <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
          <span className="text-2xl text-white">Ticketing Triage</span>
          <button
            className="text-2xl text-white"
            onClick={() => {
              document.body.classList.remove("overflow-hidden");
              props.onClose();
            }}
          >
            <IoMdClose />
          </button>
        </div>

        <div className="px-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary ">
          <form onSubmit={handleOnSubmit} className="p-4 space-y-4 bg-white">
            <span className="text-xl text-secondary">
              Assign the Ticket to a Department
            </span>
            <MaterialInputAutoComplete
              label="Department"
              colorTheme={"black"}
              options={department ?? []}
              getOptionLabel={(option) => option.name ?? ""}
              placeholder="Choose Department"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={formState.department}
              onChange={(event, selectedValue) => {
                if (selectedValue) {
                  handleOnChange(selectedValue, "department");
                }
              }}
            />

            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-white rounded-lg bg-button w-fit"
              >
                Update Department
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
