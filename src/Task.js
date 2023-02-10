export class Task{
    constructor(name, date=null, descrip=null, done = false, pName=null) {
        this.name = name;
        this.date = date;
        this.descrip = descrip;
        this.done = done;
        this.pName = pName;
    }

    set name(newName) {
        this._name = newName;
    }

    set date(newDate) {
        this._date = newDate;
    }

    set descrip(newDescrip) {
        this._descrip = newDescrip;
    }

    set done(newDone) {
        this._done = newDone;
    }

    set pName(newpName) {
        this._pName = newpName;
    }

    get name() {
        return this._name;
    }

    get date() {
        return this._date;
    }

    get descrip() {
        return this._descrip;
    }

    get done() {
        return this._done;
    }

    get pName() {
        return this._pName;
    }
};