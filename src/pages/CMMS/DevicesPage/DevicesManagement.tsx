import { useState } from "react";
import { Plus, NotePencil, Trash } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import SearchFilterBar from "../CommonComponents/SearchBar/SearchFilterBar";
import { getCMMSData } from "../CMMSData";

export default function DevicesManagement() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");


  const { devicesData } = getCMMSData(t);

  const statusMap = {
    all: null,
    active: t("sCMMS.equipmentManagement.status.active"),
    maintenance: t("sCMMS.equipmentManagement.status.maintenance"),
    malfunction: t("sCMMS.equipmentManagement.status.malfunction"),
  };

  const filteredDevices = devicesData.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(search.toLowerCase()) ||
      device.code.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      !statusMap[statusFilter] || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t("sCMMS.equipmentManagement.title")}
          </h1>
          <p className="text-gray-600">
            {t("sCMMS.equipmentManagement.subTitle")}
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={20} /> {t("sCMMS.equipmentManagement.addDevice")}
        </button>
      </div>

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        placeholder={t("sCMMS.equipmentManagement.searchPlaceholder")}
        filterOptions={[
          { label: t("sCMMS.equipmentManagement.allStatus"), value: "all" },
          {
            label: t("sCMMS.equipmentManagement.status.active"),
            value: "active",
          },
          {
            label: t("sCMMS.equipmentManagement.status.maintenance"),
            value: "maintenance",
          },
          {
            label: t("sCMMS.equipmentManagement.status.malfunction"),
            value: "malfunction",
          },
        ]}
      />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("sCMMS.equipmentManagement.tableHeaders.device")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("sCMMS.equipmentManagement.tableHeaders.location")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("sCMMS.equipmentManagement.tableHeaders.status")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("sCMMS.equipmentManagement.tableHeaders.nextMaintenance")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("sCMMS.equipmentManagement.tableHeaders.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDevices.map((device, idx) => (
                <tr key={idx} className="border-b last:border-b-0">
                  <td className="py-4 px-6">
                    <div className="text-sm font-medium text-gray-900">
                      {device.name}
                    </div>
                    <div className="text-sm text-gray-500">{device.code}</div>
                  </td>
                  <td className="py-4 px-6 ">
                    <div className="text-sm text-gray-900">
                      {device.location}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${device.statusColor}`}
                    >
                      {t(`sCMMS.equipmentManagement.status.${device.status}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <div className="text-sm text-gray-900">
                      {device.nextMaintenance}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1 rounded">
                        <NotePencil size={20} />
                      </button>
                      <button className="text-red-500 hover:text-red-700 p-1 rounded">
                        <Trash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
