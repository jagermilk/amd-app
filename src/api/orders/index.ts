import request from '@/utils/request'

const pre = 'api/v1/';
export default class Orders {
    static GetOrders (obj) {
        const data = {
            search_query: obj.keywords,
            display: obj.display,
            page: obj.page,
            size: obj.pageSize,
            order_status: obj.orderStatus,
            shipment_status: obj.shipmentStatus,
            sort: obj.sort,
            direction: obj.direction,
            filter_query: Object.values(obj.filters).flatMap(arr => arr),
            sort_query: obj.sortData
        }
        return request.post(`${pre}orders/index`, data)
    }
    static UpdateOrder(id,data){
        return request.put(`${pre}orders/${id}`,data)
    }
    static GetShipmentStatusType(){
        return request.get(`${pre}shipment-statuses`)
    }
    static GetOrderStatusType(){
        return request.get(`${pre}order-statuses`)
    }
    static GetAvvPhoto(id){
        return request.get(`${pre}orders/${id}/photos/avv_photo`)
    }
    static UpdateAvvPhoto(id,data){
        return request.put(`${pre}orders/${id}/photos/update-ordering`,data)
    }
    static DeleteAvvAttachment(id){
        return request.delete(`${pre}attachments/${id}`)
    }
}

