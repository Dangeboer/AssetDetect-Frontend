const SERVER_ORIGIN = ""; // 服务器地址

// 登录函数
const loginUrl = `${SERVER_ORIGIN}/auth/login`;

export const login = (username, password) => {
  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error("登录失败！");
      }

      return response.json();
    })
    .then((data) => {
      return data.token;
    })
    .catch((error) => {
      console.error(error);
      throw error; // 如果需要将错误继续传递
    });
};

// 注册函数
const registerUrl = `${SERVER_ORIGIN}/auth/register`;

export const register = (username, password, role) => {
  return fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, role }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.message);
        });
      }

      return "注册成功！";
    })
    .catch((error) => {
      console.error(error);
      throw error; // 如果需要将错误继续传递
    });
};

// 资产探测函数
const probeAssetsUrl = `${SERVER_ORIGIN}/asset`;

export const probeAssets = (assets, token) => {
  return fetch(probeAssetsUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(assets), // 将 assets 列表传递到后端
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("资产探测失败！");
      }

      return response.json(); // 返回的响应数据是 List<AssetResponse>
    })
    .catch((error) => {
      console.error(error);
      throw Error("资产探测请求失败！");
    });
};
