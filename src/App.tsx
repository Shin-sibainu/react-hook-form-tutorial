import { useForm } from "react-hook-form";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface LoginForm {
  name: string;
  email: string;
  password: string;
}

function App() {
  //フォーム状態とメソッドを取得
  const {
    register, //フォームから入力された値のstate管理、バリデーション処理が可能
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });

  const onSubmit = (data: any) => {
    console.log("Submitted Data", data);
  };

  return (
    <div className="form-container">
      <h1>React-Hook-Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">名前</label>
        <input
          type="text"
          id="name"
          {...register("name", {
            required: "名前は必須です",
            minLength: { value: 4, message: "4文字以上で入力してください" },
          })}
        />
        {errors.name && <p>{errors.name.message as React.ReactNode}</p>}

        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "メールアドレスは必須です",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "正しいメールアドレスを入力してください",
            },
          })}
        />
        {errors.email && <p>{errors.email.message as React.ReactNode}</p>}

        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "パスワードは必須です",
            minLength: { value: 8, message: "8文字以上で入力してください" },
          })}
        />
        {errors.password && <p>{errors.password.message as React.ReactNode}</p>}

        <button type="submit">送信</button>
      </form>
    </div>
  );
}

export default App;
