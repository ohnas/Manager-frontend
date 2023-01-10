export const baseUrl = "https://port-0-manager-backend-4fuvwk25lcpo4p0w.gksl2.cloudtype.app"

// 모던 자바스크립트에서 찾은 내용
export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
