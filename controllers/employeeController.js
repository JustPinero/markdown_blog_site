const { Posts } = require('../models');
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        console.log("success")
        return res.status(200).json({ posts });
    } catch (error) {
        console.log("failure")
        return res.status(500).send(error.message);
    }
}

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findOne({
            where: { id: id }
        });
        if (post) {
            return res.status(200).json({ post });
        }
        return res.status(404).send('Post with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        return res.status(201).json({
            post,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const [updatedPost] = await Post.update(req.body, {
            where: { id: id }
        });
        if (updatedPost) {
            const updatedPost = await Post.findOne({ where: { id: id } });
            return res.status(200).json({ post: updatedPost });
        }
        throw new Error('Employee not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await Post.destroy({
            where: { id: id }
        });
        if (deletedPost) {
            return res.status(204).send("Post deleted");
        }
        throw new Error("Post not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}