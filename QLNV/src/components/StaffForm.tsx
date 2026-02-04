
import Joi from "joi";
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm, type SubmitHandler } from "react-hook-form"; // Thêm SubmitHandler
import type { IStaff } from "../store/StaffStore";
import { staffStore } from "../store/StaffStore"; 
import { observer } from "mobx-react-lite"; 


type StaffFormInput = Omit<IStaff, 'id'>;   

const StaffForm = observer(() => {
    const schema = Joi.object<StaffFormInput>({
        fullname: Joi.string()
            .min(5)
            .max(50)
            .required().messages({
                'string.empty': 'Tên không được để trống',
                'string.min': 'Tên phải ít nhất 5 ký tự',
                'any.required': 'Tên là bắt buộc',
            }),
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required()
            .messages({
                'string.email': 'Email không hợp lệ',
                'any.required': 'Email là bắt buộc',
            }),
        salary: Joi.number().min(0).required().messages({
            'number.min': 'Lương không được âm',
            'number.base': 'Lương phải là số',
            'any.required': 'Lương là bắt buộc',
        }),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm<StaffFormInput>({
        resolver: joiResolver(schema),
        mode: 'all' // Chế độ validate "real-time" bạn thích đây
    });

    // Viết hàm submit riêng biệt
    const onProcessSubmit: SubmitHandler<StaffFormInput> = (data) => {
        console.log("Data sạch từ Joi:", data);
        staffStore.addStaff(data); 
        reset(); 
    };

   
   return (
    <div className="card">
        <h2>Thêm nhân viên</h2>
        <form onSubmit={handleSubmit(onProcessSubmit)}>
        <div className="form-group">
            <label>Họ và tên</label>
            <input {...register('fullname')} placeholder="Nguyễn Văn A" />
            {errors.fullname && <p className="error-msg">{errors.fullname.message}</p>}
        </div>
        
        <div className="form-group">
            <label>Email công ty</label>
            <input {...register('email')} placeholder="name@company.com" />
            {errors.email && <p className="error-msg">{errors.email.message}</p>}
        </div>

        <div className="form-group">
            <label>Mức lương ($)</label>
            <input type="number" {...register('salary')} placeholder="5000" />
            {errors.salary && <p className="error-msg">{errors.salary.message}</p>}
        </div>

        <button type="submit" className="btn-submit">Thêm vào hệ thống</button>
        </form>
    </div>
    );
});

export default StaffForm;