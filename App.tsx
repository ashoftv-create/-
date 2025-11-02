/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, {useState, useMemo} from 'react';
import {Vacation} from './types';

const VACATION_TYPES = ['أنوال', 'إمرجنسى', 'أبسينت'];
const initialEmployees = ['يوسف', 'محمود', 'بحيرى', 'مصطفى', 'هشام', 'شعبان', 'عمرو', 'عصام', 'عاطف', 'أيمن', 'إسلام', 'خالد', 'عبدالله'];


const initialVacations: Vacation[] = [
  {
    id: self.crypto.randomUUID(),
    employeeName: 'يوسف',
    vacationType: 'أنوال',
    startDate: '2024-08-01',
    endDate: '2024-08-10',
  },
  {
    id: self.crypto.randomUUID(),
    employeeName: 'محمود',
    vacationType: 'إمرجنسى',
    startDate: '2024-07-25',
    endDate: '2024-07-26',
  },
];

const calculateDuration = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
};

/**
 * Main component for the Team Vacations app.
 */
export const App: React.FC = () => {
  const [vacations, setVacations] = useState<Vacation[]>(initialVacations);
  const [employees, setEmployees] = useState<string[]>(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);
  const [vacationType, setVacationType] = useState(VACATION_TYPES[0]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showAddEmployeeInput, setShowAddEmployeeInput] = useState(false);
  const [newEmployeeName, setNewEmployeeName] = useState('');

  const sortedVacations = useMemo(() => {
    return [...vacations].sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  }, [vacations]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee || !vacationType || !startDate || !endDate) {
      setError('يرجى ملء جميع الحقول.');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setError('تاريخ النهاية يجب أن يكون بعد تاريخ البداية.');
      return;
    }

    const newVacation: Vacation = {
      id: self.crypto.randomUUID(),
      employeeName: selectedEmployee,
      vacationType,
      startDate,
      endDate,
    };

    setVacations((prev) => [newVacation, ...prev]);

    // Reset form
    setSelectedEmployee(employees[0]);
    setVacationType(VACATION_TYPES[0]);
    setStartDate('');
    setEndDate('');
    setError(null);
  };

  const handleAddEmployee = () => {
      if(newEmployeeName.trim() && !employees.includes(newEmployeeName.trim())) {
          const updatedEmployees = [...employees, newEmployeeName.trim()];
          setEmployees(updatedEmployees);
          setSelectedEmployee(newEmployeeName.trim());
          setNewEmployeeName('');
          setShowAddEmployeeInput(false);
      }
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800" dir="rtl">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-700">
            أجازات التيم
          </h1>
        </header>

        <main className="flex flex-col items-center gap-8">
          {/* Form Section */}
          <div className="w-full max-w-2xl">
            <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
              <h2 className="text-2xl font-semibold mb-5 text-gray-700 border-b pb-3">
                إضافة أجازة جديدة
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="employeeName" className="block text-sm font-medium text-gray-600 mb-1">
                    باترول
                  </label>
                  <select
                    id="employeeName"
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                  >
                    {employees.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="vacationType" className="block text-sm font-medium text-gray-600 mb-1">
                    نوع الأجازة
                  </label>
                  <select
                    id="vacationType"
                    value={vacationType}
                    onChange={(e) => setVacationType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                  >
                    {VACATION_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-600 mb-1">
                    تاريخ البدء
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-600 mb-1">
                    تاريخ الإنتهاء
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                >
                  إضافة الأجازة
                </button>
              </form>
              <div className="mt-6 border-t pt-6">
                {showAddEmployeeInput ? (
                  <div className="space-y-2">
                     <label htmlFor="newEmployeeName" className="block text-sm font-medium text-gray-600 mb-1">
                        اسم الموظف الجديد
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            id="newEmployeeName"
                            value={newEmployeeName}
                            onChange={(e) => setNewEmployeeName(e.target.value)}
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                            placeholder="أدخل اسم الموظف"
                        />
                        <button
                            type="button"
                            onClick={handleAddEmployee}
                            className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
                        >
                            تأكيد
                        </button>
                         <button
                            type="button"
                            onClick={() => setShowAddEmployeeInput(false)}
                            className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
                        >
                            إلغاء
                        </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAddEmployeeInput(true)}
                    className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
                  >
                    إضافة موظف
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* List Section */}
          <div className="w-full">
            <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
              <h2 className="text-2xl font-semibold mb-5 text-gray-700 border-b pb-3">
                قائمة الأجازات
              </h2>
              <div className="overflow-x-auto">
                {sortedVacations.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    لا توجد أجازات حالياً.
                  </p>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          باترول
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          نوع الأجازة
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          تاريخ البدء
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          تاريخ الإنتهاء
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          المدة (أيام)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sortedVacations.map((vacation) => (
                        <tr key={vacation.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {vacation.employeeName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {vacation.vacationType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {vacation.startDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {vacation.endDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {calculateDuration(
                              vacation.startDate,
                              vacation.endDate
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};