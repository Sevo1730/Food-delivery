"use client";

const statuses = ["pending", "preparing", "on_the_way", "delivered", "cancelled"] as const;
type Status = (typeof statuses)[number];

const label: Record<Status, string> = {
  pending: "Хүлээгдэж буй",
  preparing: "Бэлтгэж байна",
  on_the_way: "Хүргэлтэд явж байна",
  delivered: "Хүргэгдсэн",
  cancelled: "Цуцлагдсан",
};

interface Props {
  orderId?: string;
  currentStatus?: Status;
  onChange?: (status: Status) => void;
}

export default function ChangeStatus({ orderId, currentStatus = "pending", onChange }: Props) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-md">
      {orderId && <p className="text-sm text-zinc-500 mb-3">Захиалга #{orderId}</p>}
      <div className="flex flex-wrap gap-2">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => onChange?.(s)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              currentStatus === s ? "bg-[#E63B2E] text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {label[s]}
          </button>
        ))}
      </div>
    </div>
  );
}
