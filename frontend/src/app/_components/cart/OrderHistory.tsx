"use client";

interface HistoryOrder {
  id: string;
  date: string;
  total: number;
  status: "pending" | "preparing" | "on_the_way" | "delivered";
  items: { name: string; quantity: number }[];
}

const statusLabel: Record<HistoryOrder["status"], string> = {
  pending: "Хүлээгдэж буй",
  preparing: "Бэлтгэж байна",
  on_the_way: "Хүргэлтэд явж байна",
  delivered: "Хүргэгдсэн",
};

const statusColor: Record<HistoryOrder["status"], string> = {
  pending: "bg-yellow-100 text-yellow-700",
  preparing: "bg-blue-100 text-blue-700",
  on_the_way: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
};

interface Props {
  orders?: HistoryOrder[];
}

export default function OrderHistory({ orders = [] }: Props) {
  if (orders.length === 0) {
    return (
      <p className="text-center text-zinc-400 py-10">Захиалгын түүх хоосон байна</p>
    );
  }
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="rounded-2xl bg-white p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <p className="font-black text-[#121316]">#{order.id}</p>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusColor[order.status]}`}>
              {statusLabel[order.status]}
            </span>
          </div>
          <p className="text-sm text-zinc-500 mb-2">{order.date}</p>
          <div className="text-sm text-zinc-600 space-y-1">
            {order.items.map((item, i) => (
              <p key={i}>{item.name} × {item.quantity}</p>
            ))}
          </div>
          <p className="mt-3 font-black text-[#E63B2E]">${order.total.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
