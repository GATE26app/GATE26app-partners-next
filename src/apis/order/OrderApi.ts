import { AxiosInstance } from 'axios';

import instance from '@/apis/_axios/instance';

import { getToken } from '@/utils/localStorage/token';

import {
  OrderCacelFeeType,
  OrderCancelFeeItemResType,
  OrderCancelRequestParamsType,
  OrderConfrimParamsType,
  OrderDetailItemResType,
  OrderGroupResType,
  OrderGroupType,
  OrderListDtoType,
  OrderListExcelDownParamsType,
  OrderListParamsType,
  OrderMemoParamsType,
  OrderShoppingParamsType,
  RequestCacnelDeniedType,
} from './OrderApi.type';

export class OrderApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }
  //주문리스트
  getOrderList = async (
    request: OrderListParamsType,
  ): Promise<OrderListDtoType> => {
    //type : code 또는 parentCode
    var cancelText =
      request.cancelStatus !== undefined && request.cancelStatus.length > 0
        ? request.cancelStatus
          .map((number) => `&cancelStatus=${number}`)
          .join('')
        : '';

    const { data } = await this.axios({
      method: 'GET',
      url: `/partner/orders?pageNo=${request.pageNo + 1}&pageSize=${request.pageSize
        }${request.searchKeyword != ''
          ? '&searchType=' +
          request.searchType +
          '&searchKeyword=' +
          request.searchKeyword
          : ''
        }${request.orderType != 0 ? '&orderType=' + request.orderType : ''}${request.orderStatus != 0 ? '&orderStatus=' + request.orderStatus : ''
        }${request.cancelStatus?.length !== 0 ? cancelText : ''}${request.periodType != '' ? '&periodType=' + request.periodType : ''
        }${request.periodStartDate != ''
          ? '&periodStartDate=' + request.periodStartDate
          : ''
        }${request.periodEndDate != ''
          ? '&periodEndDate=' + request.periodEndDate
          : ''
        }`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //주문 리스트 엑셀 다운로드
  getOrderListExcelDown = async (
    request: OrderListExcelDownParamsType,
  ): Promise<OrderListDtoType> => {
    //type : code 또는 parentCode
    var cancelText =
      request.cancelStatus !== undefined && request.cancelStatus.length > 0
        ? request.cancelStatus
          .map((number) => `&cancelStatus=${number}`)
          .join('')
        : '';

    const { data } = await this.axios({
      method: 'GET',
      url: `/partner/download-orders?${request.searchKeyword != ''
        ? '&searchType=' +
        request.searchType +
        '&searchKeyword=' +
        request.searchKeyword
        : ''
        }${request.orderType != 0 ? '&orderType=' + request.orderType : ''}${request.orderStatus != 0 ? '&orderStatus=' + request.orderStatus : ''
        }${request.cancelStatus?.length !== 0 ? cancelText : ''}${request.periodType != '' ? '&periodType=' + request.periodType : ''
        }${request.periodStartDate != ''
          ? '&periodStartDate=' + request.periodStartDate
          : ''
        }${request.periodEndDate != ''
          ? '&periodEndDate=' + request.periodEndDate
          : ''
        }`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };

  //주문상세
  getOrderItem = async (orderId: string): Promise<OrderDetailItemResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'GET',
      url: `/partner/orders/${orderId}`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
  //주문 메모 입력
  putOrderMemo = async (
    req: OrderMemoParamsType,
  ): Promise<OrderDetailItemResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'PUT',
      url: `/partner/orders/${req.orderId}/memo`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.body,
    });
    return data;
  };

  //배송지정보 입력
  putOrderDelivery = async (
    req: OrderShoppingParamsType,
  ): Promise<OrderDetailItemResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'PUT',
      url: `/partner/orders/${req.orderId}/shipping`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.body,
    });
    return data;
  };

  //주문 취소 요청
  postOrderCancelRequest = async (
    req: OrderCancelRequestParamsType,
  ): Promise<OrderDetailItemResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/orders/${req.orderId}/request-cancel`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.body,
    });
    return data;
  };

  //주문 취소
  postOrderCancel = async (
    req: OrderCancelRequestParamsType,
  ): Promise<OrderDetailItemResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/orders/${req.orderId}/cancel`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.body,
    });
    return data;
  };

  // 모든 주문형태에 대해서 취소가 가능 (파트너 선에서 최종 취소)
  postOrderCancelByPartner = async (
    req: OrderCancelRequestParamsType,
  ): Promise<OrderDetailItemResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/orders/${req.orderId}/cancel-confirm`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.body,
    });
    return data;
  };

  //주문 접수
  postOrderConfrim = async (
    req: OrderConfrimParamsType,
  ): Promise<OrderDetailItemResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/orders/${req.orderId}/confirm`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
  //주문번호 그룹화
  postOrderGroup = async (req: OrderGroupType): Promise<OrderGroupResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: '/partner/grouping-orders',
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req,
    });
    return data;
  };
  //주문쉬초요청건 파트너승인처리
  postRequestCancelConfirm = async (
    req: string,
  ): Promise<OrderGroupResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/orders/${req}/request-cancel-confirm`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
    });
    return data;
  };
  //주문쉬초요청건 파트너거절처리
  postRequestCancelDenied = async (
    req: RequestCacnelDeniedType,
  ): Promise<OrderGroupResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/orders/${req.orderId}/request-cancel-denied`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.obj,
    });
    return data;
  };

  //주문 취소 수수료
  postOrderCheckCancelFee = async (
    req: OrderCacelFeeType,
  ): Promise<OrderCancelFeeItemResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/partner/orders/${req.orderId}/check-cancellation-fee`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.body,
    });
    return data;
  };

  //주문 취소 요청
  postOrderCancelRequestForAgent = async (
    req: OrderCancelRequestParamsType,
  ): Promise<OrderDetailItemResType> => {
    //type : code 또는 parentCode
    const { data } = await this.axios({
      method: 'POST',
      url: `/admin/agent/orders/${req.orderId}/request-cancel`,
      headers: {
        'X-AUTH-TOKEN': `${getToken().access}`,
      },
      data: req.body,
    });
    return data;
  };

}


const orderApi = new OrderApi();

export default orderApi;
