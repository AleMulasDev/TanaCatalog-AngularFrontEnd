export class Holder {
  constructor(obj?) {
    if (obj) {
      const {id, section_id, title, address, cap, city} = obj;
      this.id = id ? id : undefined;
      this.section_id = section_id ? section_id : undefined;
      this.title = title ? title : undefined;
      this.address = address ? address : undefined;
      this.cap = cap ? cap : undefined;
      this.city = city ? city : undefined;
    } else {
      return;
    }
  }

  id;
  section_id;
  title;
  address;
  cap;
  city;
}