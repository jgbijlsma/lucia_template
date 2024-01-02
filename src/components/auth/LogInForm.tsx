"use client";

import { FormEvent, useState } from "react";

export default function LogInForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    setAwaitingResponse(true);
    setServerErrors([]);

    const res = await fetch("/api/auth/logIn", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    setAwaitingResponse(false);

    if (res.status === 200) {
      location.replace("/");
    } else {
      try {
        const { messages } = (await res.json()) as {
          messages: string[] | undefined;
        };
        if (messages) setServerErrors(messages);
        else throw new Error();
      } catch (error) {
        setServerErrors(["Something went wrong on the server."]);
      }
    }
  }

  return (
    <form onSubmit={onSubmit} className="my-4">
      {/* Show server errors to the user if there are any */}
      {serverErrors.length > 0 && (
        <div className="mb-4">
          {serverErrors.map((message, i) => {
            return (
              <div key={i} className="mb-1 text-red-500">
                {message}
              </div>
            );
          })}
        </div>
      )}

      {/* Username input */}
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        className="block w-full px-2 py-1 mb-4 border border-black rounded-md"
      />

      {/* Password input */}
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="block w-full px-2 py-1 mb-4 border border-black rounded-md"
      />

      {/* Show submit button only when not awaiting the API register request */}
      {!awaitingResponse ? (
        <button
          type="submit"
          className="px-2 py-1 bg-green-500 rounded-md hover:bg-green-400"
        >
          Log in
        </button>
      ) : (
        <span>Loading...</span>
      )}
    </form>
  );
}
