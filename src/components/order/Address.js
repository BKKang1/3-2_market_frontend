import * as React from 'react';
import DaumPostcode from 'react-daum-postcode';
import {Button} from 'antd'

const Address = (props) => {
    /**
     * useState
     */
    const [openPostcode, setOpenPostcode] = React.useState(false);

    /**
     * handler
     */
    const handle = {
        // 버튼 클릭 이벤트
        clickButton: () => {
            setOpenPostcode(current => !current);
        },

        // 주소 선택 이벤트
        selectAddress: (data) => {
            console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `)
            props.setAddress(data.address)
            props.setZipCode(data.zonecode)
            setOpenPostcode(false);
        },
    }

    return (
        <div>
            <Button onClick={handle.clickButton}>주소 검색</Button>

            {openPostcode && 
                <DaumPostcode 
                    onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                    autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                    defaultQuery='판교역로 235' // 팝업을 열때 기본적으로 입력되는 검색어 
                    />}
        </div>
    )
}

export default Address;