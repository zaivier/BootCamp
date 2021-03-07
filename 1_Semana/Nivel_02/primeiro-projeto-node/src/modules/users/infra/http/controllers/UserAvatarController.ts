import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response) {
    try {
      const updateUserAvatarService = container.resolve(
        UpdateUserAvatarService,
      );

      const user = await updateUserAvatarService.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      return response.json(classToClass(user));
    } catch (err) {
      return response
        .status(err.statusCode || 400)
        .json({ error: err.message });
    }
  }
}
