import { observer } from "mobx-react-lite";
import { staffStore } from "../store/StaffStore";
import { useEffect } from "react";

const StaffList = observer(() => {
    const { list, removeStaff, totalBudget } = staffStore;
     useEffect(() => {
        localStorage.setItem('staffList', JSON.stringify(staffStore.list));
    }, [staffStore.list]);

    return (
        <div className="card">
            <h2>Danh sách nhân sự ({list.length})</h2>

            {list.length === 0 ? (
                <div className="empty-state">
                    <p>Hiện chưa có nhân viên nào. Hãy thêm ở form bên cạnh!</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Tên nhân viên</th>
                                <th>Email công ty</th>
                                <th>Mức lương</th>
                                <th style={{ textAlign: 'center' }}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((staff) => (
                                <tr key={staff.id}>
                                    <td className="font-semibold">{staff.fullname}</td>
                                    <td>{staff.email}</td>
                                    <td className="salary-cell">
                                        ${staff.salary.toLocaleString()}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button 
                                            className="btn-delete"
                                            onClick={() => removeStaff(staff.id)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {list.length > 0 && (
                <div className="total-section">
                    <span>Tổng ngân sách lương hằng tháng:</span>
                    <strong className="total-amount">
                        ${totalBudget.toLocaleString()}
                    </strong>
                </div>
            )}
        </div>
    );
})

export default StaffList;