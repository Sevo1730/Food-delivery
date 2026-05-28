"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X, Calendar, RefreshCw } from "lucide-react";
import { orderApi } from "@/lib/axios";
import { BackendOrder } from "@/types";

type Status = "PENDING" | "DELIVERED" | "CANCELED";

const STATUS_STYLE: Record<Status, string> = {
  PENDING: "border border-[#E63B2E] text-[#E63B2E]",
  DELIVERED: "border border-green-500 text-green-600",
  CANCELED: "border border-zinc-300 text-zinc-500",
};

const PAGE_SIZE = 12;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<BackendOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [rowStatusOpen, setRowStatusOpen] = useState<string | null>(null);
  const [bulkModal, setBulkModal] = useState(false);
  const [bulkStatus, setBulkStatus] = useState<Status>("DELIVERED");
  const [page, setPage] = useState(1);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await orderApi.getAllOrders();
      setOrders(res.data);
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 401) {
        setError("Захиалга харахын тулд нэвтэрнэ үү");
      } else {
        setError("Захиалга ачааллахад алдаа гарлаа");
      }
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const pageOrders = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleAll = () => {
    if (selected.size === pageOrders.length) setSelected(new Set());
    else setSelected(new Set(pageOrders.map((o) => o._id)));
  };

  const toggleOne = (id: string) => {
    const s = new Set(selected);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelected(s);
  };

  const toggleExpand = (id: string) => {
    const s = new Set(expanded);
    s.has(id) ? s.delete(id) : s.add(id);
    setExpanded(s);
  };

  const changeStatus = async (id: string, status: Status) => {
    try {
      await orderApi.updateStatus(id, status);
      setOrders((prev) => prev.map((o) => o._id === id ? { ...o, status } : o));
    } catch {
      alert("Статус өөрчлөхөд алдаа гарлаа");
    } finally {
      setRowStatusOpen(null);
    }
  };

  const applyBulkStatus = async () => {
    try {
      await Promise.all([...selected].map((id) => orderApi.updateStatus(id, bulkStatus)));
      setOrders((prev) => prev.map((o) => selected.has(o._id) ? { ...o, status: bulkStatus } : o));
      setSelected(new Set());
      setBulkModal(false);
    } catch {
      alert("Алдаа гарлаа");
    }
  };

  const getCustomer = (order: BackendOrder) => {
    if (typeof order.user === "object" && order.user !== null) return order.user.email;
    return "—";
  };

  const formatDate = (iso: string) => iso.split("T")[0].replace(/-/g, "/");

  const pageNumbers = (): (number | "...")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    return [1, 2, 3, 4, 5, "...", totalPages];
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-5 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#121316]">Orders</h1>
          <p className="text-sm text-zinc-400">{orders.length} items</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={fetchOrders} className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-500 hover:bg-zinc-50">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-600">
            <Calendar className="h-4 w-4 text-zinc-400" />
            <span>All orders</span>
          </div>
          <button
            onClick={() => selected.size > 0 && setBulkModal(true)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
              selected.size > 0 ? "bg-[#121316] text-white hover:bg-zinc-800" : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
            }`}
          >
            Change delivery state
            {selected.size > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-black text-[#121316]">
                {selected.size}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-zinc-400 text-sm">
            Уншиж байна...
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-sm text-red-500">{error}</p>
            <a href="/auth/login" className="rounded-xl bg-[#121316] px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800">
              Нэвтрэх
            </a>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex items-center justify-center py-20 text-zinc-400 text-sm">
            Захиалга байхгүй байна
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" checked={selected.size === pageOrders.length && pageOrders.length > 0}
                    onChange={toggleAll} className="h-4 w-4 rounded accent-[#121316]" />
                </th>
                <th className="px-2 py-3 text-left text-zinc-400 font-medium">№</th>
                <th className="px-4 py-3 text-left text-zinc-400 font-medium">Customer</th>
                <th className="px-4 py-3 text-left text-zinc-400 font-medium">Food</th>
                <th className="px-4 py-3 text-left text-zinc-400 font-medium">
                  <span className="flex items-center gap-1">Date <ChevronDown className="h-3.5 w-3.5" /></span>
                </th>
                <th className="px-4 py-3 text-left text-zinc-400 font-medium">Total</th>
                <th className="px-4 py-3 text-left text-zinc-400 font-medium">Delivery Address</th>
                <th className="px-4 py-3 text-left text-zinc-400 font-medium">
                  <span className="flex items-center gap-1">Delivery state <ChevronDown className="h-3.5 w-3.5" /></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {pageOrders.map((order, idx) => (
                <>
                  <tr key={order._id}
                    className={`border-b border-zinc-50 hover:bg-zinc-50 transition-colors ${selected.has(order._id) ? "bg-zinc-50" : ""}`}>
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.has(order._id)}
                        onChange={() => toggleOne(order._id)} className="h-4 w-4 rounded accent-[#121316]" />
                    </td>
                    <td className="px-2 py-3 text-zinc-500">{(page - 1) * PAGE_SIZE + idx + 1}</td>
                    <td className="px-4 py-3 text-zinc-700 max-w-32 truncate">{getCustomer(order)}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleExpand(order._id)} className="flex items-center gap-1.5 text-zinc-600">
                        <span>{order.foodOrderItems.length} foods</span>
                        {expanded.has(order._id) ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-zinc-600">{formatDate(order.createdAt)}</td>
                    <td className="px-4 py-3 font-semibold text-zinc-700">${order.totalPrice.toFixed(2)}</td>
                    <td className="px-4 py-3 text-zinc-500 max-w-45 truncate">{order.deliveryAddress}</td>
                    <td className="px-4 py-3 relative">
                      <button
                        onClick={() => setRowStatusOpen(rowStatusOpen === order._id ? null : order._id)}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[order.status as Status] ?? "border border-zinc-200 text-zinc-500"}`}
                      >
                        {order.status}
                        <ChevronDown className="h-3 w-3" />
                      </button>
                      {rowStatusOpen === order._id && (
                        <div className="absolute right-4 top-10 z-20 w-36 rounded-xl bg-white shadow-xl border border-zinc-100 overflow-hidden">
                          {(["DELIVERED", "PENDING", "CANCELED"] as Status[]).map((s) => (
                            <button key={s} onClick={() => changeStatus(order._id, s)}
                              className="block w-full px-4 py-2.5 text-left text-sm hover:bg-zinc-50">
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>

                  {expanded.has(order._id) && (
                    <tr key={`${order._id}-expand`} className="bg-zinc-50 border-b border-zinc-100">
                      <td colSpan={8} className="px-16 py-2">
                        <div className="space-y-2">
                          {order.foodOrderItems.map((food, fi) => (
                            <div key={fi} className="flex items-center gap-3">
                              {food.image && (
                                <img src={food.image} alt={food.name} className="h-10 w-12 rounded-lg object-cover" />
                              )}
                              <span className="text-sm text-zinc-700">{food.name}</span>
                              <span className="ml-auto text-sm text-zinc-400">x {food.quantity}</span>
                              <span className="text-sm font-semibold text-zinc-600">${(food.price * food.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {!loading && orders.length > 0 && (
          <div className="flex items-center justify-center gap-1.5 py-4">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 hover:bg-zinc-100 disabled:opacity-30">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {pageNumbers().map((n, i) => (
              <button key={i} onClick={() => typeof n === "number" && setPage(n)}
                className={`grid h-8 w-8 place-items-center rounded-lg text-sm font-semibold transition-colors ${
                  n === page ? "bg-[#121316] text-white" : n === "..." ? "text-zinc-400 cursor-default" : "text-zinc-600 hover:bg-zinc-100"
                }`}>
                {n}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 hover:bg-zinc-100 disabled:opacity-30">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Bulk status modal */}
      {bulkModal && (
        <>
          <div className="fixed inset-0 z-50 bg-black/30" onClick={() => setBulkModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-[#121316]">Change delivery state</h3>
                <button onClick={() => setBulkModal(false)} className="grid h-7 w-7 place-items-center rounded-full bg-zinc-100 hover:bg-zinc-200">
                  <X className="h-4 w-4 text-zinc-500" />
                </button>
              </div>
              <div className="flex gap-2 mb-6">
                {(["DELIVERED", "PENDING", "CANCELED"] as Status[]).map((s) => (
                  <button key={s} onClick={() => setBulkStatus(s)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      bulkStatus === s ? "border border-[#E63B2E] bg-red-50 text-[#E63B2E]" : "border border-zinc-200 text-zinc-600 hover:border-zinc-400"
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
              <button onClick={applyBulkStatus} className="w-full rounded-xl bg-[#121316] py-3 font-semibold text-white hover:bg-zinc-800">
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
