import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./App.css";

interface LoginForm {
  name: string;
  email: string;
  password: string;
}

const validationSchema = z.object({
  name: z
    .string()
    .nonempty("名前は必須です")
    .min(4, "名前は4文字以上で入力してください"),
  email: z
    .string()
    .nonempty("メールアドレスは必須です")
    .email("正しいメールアドレスを入力してください"),
  password: z
    .string()
    .nonempty("パスワードは必須です")
    .min(6, "パスワードは6文字以上で入力してください"),
});

function App() {
  //フォーム状態とメソッドを取得
  const {
    register, //フォームから入力された値のstate管理、バリデーション処理が可能
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
    shouldUnregister: false,
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (data: LoginForm) => {
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
          // {...register("name", {
          //   required: "名前は必須です",
          //   minLength: { value: 4, message: "4文字以上で入力してください" },
          // })}
          {...register("name")}
        />
        {errors.name && <p>{errors.name.message as React.ReactNode}</p>}

        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          // {...register("email", {
          //   required: "メールアドレスは必須です",
          //   pattern: {
          //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          //     message: "正しいメールアドレスを入力してください",
          //   },
          // })}
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message as React.ReactNode}</p>}

        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="password"
          // {...register("password", {
          //   required: "パスワードは必須です",
          //   minLength: { value: 8, message: "8文字以上で入力してください" },
          // })}
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message as React.ReactNode}</p>}

        <button type="submit">送信</button>
      </form>
    </div>
  );
}

export default App;
