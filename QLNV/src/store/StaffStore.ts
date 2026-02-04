import { makeAutoObservable, reaction } from "mobx";

export interface IStaff {
  id: number;
  fullname: string;
  email: string;
  salary: number;
}

class StaffStore {
  list: IStaff[] = JSON.parse(localStorage.getItem('staffList') || '[]');

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.list.slice(),
      (list) => {
        localStorage.setItem('staffList', JSON.stringify(list));
      }
    )
  }
  addStaff = (staff: Omit<IStaff, 'id'>) => {
    const newStaff: IStaff = {
      ...staff,
      id: Date.now(),
    };
    this.list.push(newStaff);
  };

  removeStaff = (id: number) => {
    this.list = this.list.filter(staff => staff.id !== id);
  };

  get totalBudget() {
    return this.list.reduce((sum, staff) => sum + staff.salary, 0);
  }
}

export const staffStore = new StaffStore();