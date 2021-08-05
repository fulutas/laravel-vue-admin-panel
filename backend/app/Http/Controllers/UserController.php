<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function index()
    {
        $this->authorize("view", "users");
        return UserResource::collection(User::with("role")->paginate());
    }


    public function store(UserCreateRequest $request)
    {
        $this->authorize("edit","users");
        $user = User::create(
            $request->only("first_name", "last_name", "email", "role_id")
            + ["password" => Hash::make("1234"), "name" => $request->first_name . " " . $request->last_name]
        );
        return response(new UserResource($user), Response::HTTP_CREATED);
    }
    public function show($id)
    {
        return new UserResource(User::with("role")->find($id));
    }


    public function update(UserUpdateRequest $request, $id)
    {
        $user = User::find($id);
        $user->update($request->only("first_name", "last_name", "email", "name","role_id"));
        return \response(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        $user = User::destroy($id);
        return \response(null, Response::HTTP_NO_CONTENT);
    }
}
